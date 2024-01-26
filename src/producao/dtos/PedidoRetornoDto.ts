import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PedidoDto, PedidoItemDto } from './PedidoDto';
import { PedidoStatusEnum } from '../types';

export class PedidoItemRetornoDto {
  @ApiProperty({
    description: 'Identificador do Item',
    example: '123456',
  })
  public readonly id?: number;

  @ApiProperty({
    description: 'Quantidade do Item',
    example: '5',
  })
  public quantidade?: number;

  @ApiProperty({
    description: 'Nome do Produto',
    example: 'Guaraná',
  })
  public nomeProduto?: string;

  @ApiProperty({
    description: 'Id do produto',
    example: '5',
  })
  public idProduto?: number;

  @ApiProperty({
    description: 'Id do Pedido',
    example: '123456',
  })
  public pedidoId?: number;
}

export class PedidoRetornoDto {
  @ApiProperty({
    description: 'Identificador do pedido',
    example: '123456',
  })
  public readonly identificadorPedido?: string;

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
