import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PedidoItemCriarDto {
  @ApiProperty({
    description: 'Quantidade do Item',
    example: '5',
  })
  public quantidade?: number;

  @ApiProperty({
    description: 'Id do Produto',
    example: '1',
  })
  public produtoId?: number;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Coca',
  })
  public nomeProduto: string;
}

export class PedidoCriarDto {
  @ApiProperty({
    description: 'Observação',
    example: 'Sem cebola',
  })
  public readonly observacao?: string;

  @ApiProperty({
    description: 'Identificacao do Pedido',
    example: '98776755454',
  })
  public readonly identificacao?: string;


  @ApiProperty({
    description: 'Numero do pedido',
    example: '1',
  })
  public readonly numero?: number;

  @ApiProperty({
    description: 'Itens do Pedido',
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(PedidoItemCriarDto) }],
    },
  })
  public readonly itens: PedidoItemCriarDto[];
}
