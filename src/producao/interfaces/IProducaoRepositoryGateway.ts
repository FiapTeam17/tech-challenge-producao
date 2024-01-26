import { PedidoDto } from '../dtos';

export const IProducaoRepositoryGateway: unique symbol = Symbol('IProducaoRepositoryGateway');

export interface IProducaoRepositoryGateway {
  atualizarStatus(pedido: PedidoDto): Promise<void>;
  receberPedido(pedido: PedidoDto): Promise<void>;
  obterPorId(pedidoId: number): Promise<PedidoDto>;
  obterEmAndamento(): Promise<PedidoDto[]>;
  obterPedidos(): Promise<PedidoDto[]>;
}
