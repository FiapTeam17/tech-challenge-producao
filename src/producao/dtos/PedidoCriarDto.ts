import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PedidoItemCriarDto } from './PedidoItemCriarDto';

export class PedidoCriarDto {
  @ApiProperty({
    description: 'Observação',
    example: 'Sem cebola',
  })
  public readonly observacao?: string;

  @ApiProperty({
    description: 'Identificação do pedido',
    example: '1',
  })
  public readonly identificacaoPedido?: number;

  @ApiProperty({
    description: 'Identificação do Cliente',
    example: '98776755454',
  })
  public readonly identificacaoCliente?: string;

  @ApiProperty({
    description: 'Itens do Pedido',
    isArray: true,
    type: () => PedidoItemCriarDto,
  })
  public readonly itens: PedidoItemCriarDto[];
}
