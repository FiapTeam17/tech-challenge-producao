import { PedidoEmAndamentoDto, PedidoRetornoDto } from '../dtos';

export const IObterPedidoUseCase: unique symbol = Symbol('IObterPedidoUseCase');

export interface IObterPedidoUseCase {
  obterPorId(id: number): Promise<PedidoRetornoDto>;

  obterEmAndamento(): Promise<PedidoEmAndamentoDto[]>;

  obterPorStatus(status: string): Promise<PedidoRetornoDto[]>;
}
