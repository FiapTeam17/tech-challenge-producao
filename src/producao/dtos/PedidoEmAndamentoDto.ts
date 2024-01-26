import { PedidoEntity } from '../entities';
import { PedidoStatusEnum } from '../types';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PedidoItemDto } from './PedidoDto';

export class PedidoEmAndamentoDto {
  @ApiProperty({
    description: 'Identificador do Pedido',
    example: '123456',
  })
  public readonly id?: number;

  @ApiProperty({
    description: 'Observação',
    example: 'Sem cebola',
  })
  public readonly observacao?: string;

  @ApiProperty({
    description: 'Cliente',
    example: '123456',
  })
  public readonly clienteId?: number;

  @ApiProperty({
    description: 'Status',
    example: 'RECEBIDO',
    enum: PedidoStatusEnum,
  })
  public readonly status?: PedidoStatusEnum;

  @ApiProperty({
    description: 'Data e hora do cadastro',
    example: '2001-10-15 13:40:55',
  })
  public readonly dataCadastro?: Date;

  @ApiProperty({
    description: 'Tempo de espera em minutos',
    example: '100',
  })
  public readonly tempoEspera?: number;

  @ApiProperty({
    description: 'Itens do Pedido',
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(PedidoItemDto) }],
    },
  })
  public readonly itens: PedidoItemDto[];

  constructor(pedido: PedidoEntity) {
    this.id = pedido.id;
    this.observacao = pedido.observacao;
    this.status = pedido.status;
    this.dataCadastro = pedido.dataCadastro;
    this.tempoEspera = pedido.tempoEspera();
    this.itens = pedido.itens.map(i => {
      return new PedidoItemDto(
        i._quantidade,
        i._nomeProduto,
        i.idProduto,
        i.pedido.id,
        i.id
      )
    })
  }
}
