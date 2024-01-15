import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusPedidoEnumMapper } from '../../types';
import { PedidoDto } from '../../dtos';

@Entity('Pedido')
export class PedidoModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
  })
  status: number;

  @Column({
    nullable: false,
  })
  dataCadastro: Date;

  @Column({
    nullable: true,
  })
  dataConclusao?: Date;

  @Column({
    nullable: true,
  })
  observacao?: string;

  constructor(pedidoDto?: PedidoDto) {
    if (pedidoDto) {
      this.id = pedidoDto.id;
      this.observacao = pedidoDto.observacao;
      this.dataCadastro = pedidoDto.dataCadastro as never;
      this.dataConclusao = pedidoDto.dataConclusao;
      const status = pedidoDto.status;
      if (status !== undefined) {
        this.status = StatusPedidoEnumMapper.enumParaNumber(status);
      }
    }
  }

  public getDto(): PedidoDto {
    return new PedidoDto(
      StatusPedidoEnumMapper.numberParaEnum(this.status),
      this.dataCadastro,
      null,
      this.observacao,
      this.dataConclusao,
      this.id,
    );
  }
}
