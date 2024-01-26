import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoDto } from '../../dtos';
import { PedidoItemModel } from '../models';
import { StatusPedidoEnumMapper } from '../../types';

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

  @Column({
    nullable: true,
  })
  identificacaoPedido?: string;

  @OneToMany(() => PedidoItemModel, (item) => item.pedido)
  //@JoinTable()
  itens?: PedidoItemModel[];

  constructor(pedidoDto?: PedidoDto) {
    if (pedidoDto) {
      this.id = pedidoDto.id;
      this.observacao = pedidoDto.observacao;
      this.dataCadastro = pedidoDto.dataCadastro as never;
      this.dataConclusao = pedidoDto.dataConclusao;
      this.identificacaoPedido = pedidoDto.identificacaoPedido;
      this.itens = pedidoDto.itens?.map(i => new PedidoItemModel(i, this));
      const status = pedidoDto.status;
      if (status !== undefined) {
        this.status = StatusPedidoEnumMapper.enumParaNumber(status);
      }
    }
  }

  public getDto(): PedidoDto {

    const itens = this.itens?.map(i => i.getDto());

    return new PedidoDto(
      this.identificacaoPedido,
      StatusPedidoEnumMapper.numberParaEnum(this.status),
      this.dataCadastro,
      itens,
      this.observacao,
      this.dataConclusao,
      this.id,
    );
  }
}
