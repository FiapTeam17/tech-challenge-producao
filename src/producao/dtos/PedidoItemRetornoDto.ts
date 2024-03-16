import { ApiProperty } from '@nestjs/swagger';

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
