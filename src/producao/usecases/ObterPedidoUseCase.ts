import { IObterPedidoUseCase, IProducaoRepositoryGateway } from '../interfaces';
import { BadRequestException, Logger } from '@nestjs/common';
import { PedidoEmAndamentoDto, PedidoRetornoDto } from '../dtos';
import { PedidoEntity } from '../entities';
import { StatusPedidoEnumMapper } from '../types';

export class ObterPedidoUseCase implements IObterPedidoUseCase {
  constructor(
    private producaoRepositoryGateway: IProducaoRepositoryGateway,
    // private obterPagamentoUseCase: IObterPagamentoUseCase,
    private logger: Logger,
  ) {}

  async obterPorId(id: number): Promise<PedidoRetornoDto> {
    const pedidoOp = await this.producaoRepositoryGateway.obterPorId(id);
    if (pedidoOp == undefined) {
      this.logger.warn('Pedido não encontrado. id={}', id);
      throw new BadRequestException('Pedido não encontrado');
    }

    return PedidoRetornoDto.getInstance(pedidoOp);
  }

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

  async obterPorStatus(status: string): Promise<PedidoRetornoDto[]> {
    const pedidos = await this.producaoRepositoryGateway.obterPorStatus(
      StatusPedidoEnumMapper.stringParaEnum(status),
    );

    return pedidos.map((p) => PedidoRetornoDto.getInstance(p));
  }
}
