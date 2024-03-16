import { ApiProperty } from '@nestjs/swagger';

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
