import {
  IAtualizarStatusPedidoUseCase,
  IProducaoRepositoryGateway,
} from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoStatusEnum } from '../types';
import { PedidoDto } from '../dtos';
import { PedidoEntity } from '../entities';

export class AtualizarStatusPedidoUseCase implements IAtualizarStatusPedidoUseCase {
  constructor(
    private producaoRepositoryGateway: IProducaoRepositoryGateway,
    private logger: Logger,
  ) { }

  async atualizarStatus(pedidoId: number, status: PedidoStatusEnum): Promise<void> {
    const pedidoDto: PedidoDto = await this.producaoRepositoryGateway.obterPorId(pedidoId);
    if (pedidoDto == undefined) {
      this.logger.warn('Pedido id={} não encontrado', pedidoId);
      throw new BadRequestException('Produto não encontrado!');
    }

    const pedido = PedidoEntity.getInstance(pedidoDto);
    pedido.setStatus(status);
    await this.producaoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());
  }
}
