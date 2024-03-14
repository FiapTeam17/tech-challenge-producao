import {
  IAtualizarStatusPedidoUseCase,
  IProducaoRepositoryGateway,
} from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoStatusEnum, StatusPedidoEnumMapper } from '../types';
import { PedidoDto } from '../dtos';
import { PedidoEntity } from '../entities';
import { ISqsGateway } from '../interfaces/ISqsGateway';

export class AtualizarStatusPedidoUseCase implements IAtualizarStatusPedidoUseCase {

  private sqsUrl: string;

  constructor(
    private producaoRepositoryGateway: IProducaoRepositoryGateway,
    private readonly sqsGateway: ISqsGateway,
    private logger: Logger,
  ) {
    this.sqsUrl = process.env.QUEUE_URL || "https://sqs.us-east-2.amazonaws.com/258775715661/";
  }

  async atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void> {
    const pedidoDto: PedidoDto = await this.producaoRepositoryGateway.obterPorId(pedidoId);
    if (pedidoDto == undefined) {
      throw new BadRequestException('Pedido não encontrado!');
    }

    const pedido = PedidoEntity.getInstance(pedidoDto);
    pedido.setStatus(status);
    await this.producaoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());

    const filaProducao: any = {
      idPedido: pedido.id,
      status: StatusPedidoEnumMapper.enumParaString(pedido.getStatus())
    };

    await this.sqsGateway.sendMessage(`Pedido${pedido.id}`, this.sqsUrl.concat("producao-to-pedido-atualiza-status.fifo"), filaProducao);
  }
}
