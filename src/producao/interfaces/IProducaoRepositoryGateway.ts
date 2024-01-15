import { PedidoDto } from '../dtos';
import { PedidoStatusEnum } from '../types';

export const IProducaoRepositoryGateway: unique symbol = Symbol(
  'IProducaoRepositoryGateway',
);

export interface IProducaoRepositoryGateway {
  atualizarStatus(pedido: PedidoDto): Promise<void>;
  obterPorId(pedidoId: number): Promise<PedidoDto>;
  obterEmAndamento(): Promise<PedidoDto[]>;
  obterPorStatus(status: PedidoStatusEnum): Promise<PedidoDto[]>;
}
