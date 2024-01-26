import { PedidoStatusEnum } from '../types';

export class PedidoItemDto {
  constructor(
    public readonly quantidade: number,
    public readonly nomeProduto: string,
    public readonly idProduto: number,
    public readonly pedidoId?: number,
    public readonly id?: number,
  ) { }
}

export class PedidoDto {
  constructor(
    public readonly identificacaoPedido: string,
    public readonly status: PedidoStatusEnum,
    public readonly dataCadastro: Date,
    public readonly itens?: PedidoItemDto[],
    public readonly observacao?: string,
    public readonly dataConclusao?: Date,
    public readonly id?: number,
  ) { }
}
