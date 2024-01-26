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
    description: 'Data Cadastro',
    example: '2024-01-25 02:22:49',
  })
  public readonly dataCadastro?: Date;

  @ApiProperty({
    description: 'Status do pedido',
    example: '0',
  })
  public readonly status?: number;

  @ApiProperty({
    description: 'Identificacao do Pedido',
    example: '98776755454',
  })
  public readonly identificacaoPedido?: string;


  @ApiProperty({
    description: 'Numero do pedido',
    example: '1',
  })
  public readonly id?: number;

  @ApiProperty({
    description: 'Itens do Pedido',
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(PedidoItemCriarDto) }],
    },
  })
  public readonly itens: PedidoItemCriarDto[];
}
