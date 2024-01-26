export class PedidoItemDto {
  constructor(
    public readonly quantidade: number,
    public readonly nomeProduto: string,
    public readonly idProduto: number,
    public readonly pedidoId?: number,
    public readonly id?: number,
  ) {
  }
}
