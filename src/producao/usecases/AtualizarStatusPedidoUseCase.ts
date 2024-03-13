import {
  IAtualizarStatusPedidoUseCase,
  IProducaoRepositoryGateway,
} from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoStatusEnum } from '../types';
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
    this.sqsUrl = process.env.QUEUE_URL || "https://sqs.us-east-1.amazonaws.com/637423294426/";
  }

  async atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void> {
    const pedidoDto: PedidoDto = await this.producaoRepositoryGateway.obterPorId(pedidoId);
    if (pedidoDto == undefined) {
      this.logger.warn('Pedido id={} não encontrado', pedidoId);
      throw new BadRequestException('Produto não encontrado!');
    }

    const pedido = PedidoEntity.getInstance(pedidoDto);
    pedido.setStatus(status);
    await this.producaoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());
    //jopgar no módulo de producao, a fila deve estar em producao
    const filaProducao: any = {
      idPedido: pedido.id,
      status: pedido.getStatus()
    };

    this.sqsGateway.sendMessage(this.sqsUrl.concat("producao-to-pedido-atualiza-status"), filaProducao);
  }
}
