import { PedidoCriarDto } from '../dtos';

export const IReceberPedidoUseCase: unique symbol = Symbol('IReceberPedidoUseCase');

export interface IReceberPedidoUseCase {
  receberPedido(pedido: PedidoCriarDto): Promise<void>;
}
