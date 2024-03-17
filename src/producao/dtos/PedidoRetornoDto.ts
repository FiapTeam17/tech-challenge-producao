import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PedidoStatusEnum } from '../types';
import { PedidoItemRetornoDto } from './PedidoItemRetornoDto';
import { PedidoDto } from './PedidoDto';
import { PedidoItemDto } from './PedidoItemDto';

export class PedidoRetornoDto {
  @ApiProperty({
    description: 'Chave Primaria',
    example: '123456',
  })
  public readonly id?: number;

  @ApiProperty({
    description: 'Identificador do Pedido',
    example: '123456',
  })
  public readonly identificacaoPedido?: number;

  @ApiProperty({
    description: 'Identificação do Cliente',
    example: '123456',
  })
  public readonly identificacaoCliente?: string;

  @ApiProperty({
    description: 'Observação',
    example: 'Sem cebola',
  })
  public readonly observacao?: string;

  @ApiProperty({
    description: 'Status',
    example: 'RECEBIDO',
    enum: PedidoStatusEnum,
  })
  public readonly status?: PedidoStatusEnum;

  @ApiProperty({
    description: 'Itens do Pedido',
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(PedidoItemRetornoDto) }],
    },
  })
  public readonly itens: PedidoItemRetornoDto[];

  static getInstance(pedido: PedidoDto): PedidoRetornoDto {
    return {
      id: pedido.id,
      identificadorPedido: pedido.identificacaoPedido,
      identificacaoCliente: pedido.identificacaoCliente,
      observacao: pedido.observacao,
      status: pedido.status,
      itens: pedido.itens?.map((i) => PedidoRetornoDto.getItemInstance(i)),
    } as PedidoRetornoDto;
  }

  private static getItemInstance(item: PedidoItemDto): PedidoItemRetornoDto {
    return {
      id: item.id,
      quantidade: item.quantidade,
      idProduto: item.idProduto,
      nomeProduto: item.nomeProduto,
      pedidoId: item.pedidoId,
    };
  }
}
