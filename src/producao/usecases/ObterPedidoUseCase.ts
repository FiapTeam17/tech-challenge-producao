import { IObterPedidoUseCase, IProducaoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoEmAndamentoDto, PedidoRetornoDto } from '../dtos';
import { PedidoEntity } from '../entities';

export class ObterPedidoUseCase implements IObterPedidoUseCase {
  constructor(
    private producaoRepositoryGateway: IProducaoRepositoryGateway,
    private logger: Logger,
  ) { }

  async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
    const pedidoDtos = await this.producaoRepositoryGateway.obterEmAndamento();
    if (pedidoDtos == undefined) {
      this.logger.warn('Pedidos não retornados');
      throw new BadRequestException('Pedido não encontrado');
    }

    return pedidoDtos.map(
      (pe) => new PedidoEmAndamentoDto(PedidoEntity.getInstance(pe)),
    );
  }

  async obterPedidos(): Promise<PedidoRetornoDto[]> {
    const pedidos = await this.producaoRepositoryGateway.obterPedidos();
    return pedidos.map((p) => PedidoRetornoDto.getInstance(p));
  }
}
