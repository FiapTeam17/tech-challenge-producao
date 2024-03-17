import { PedidoStatusEnum } from '../types';
import { PedidoItemDto } from './PedidoItemDto';

export class PedidoDto {
  constructor(
    public readonly identificacaoPedido: number,
    public readonly identificacaoCliente: string,
    public readonly status: PedidoStatusEnum,
    public readonly dataCadastro: Date,
    public readonly itens?: PedidoItemDto[],
    public readonly observacao?: string,
    public readonly dataConclusao?: Date,
    public readonly id?: number,
  ) { }
}
