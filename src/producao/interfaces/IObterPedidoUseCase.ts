import { PedidoEmAndamentoDto, PedidoRetornoDto } from '../dtos';

export const IObterPedidoUseCase: unique symbol = Symbol('IObterPedidoUseCase');

export interface IObterPedidoUseCase {
  obterEmAndamento(): Promise<PedidoEmAndamentoDto[]>;
  obterPedidos(): Promise<PedidoRetornoDto[]>;
}
