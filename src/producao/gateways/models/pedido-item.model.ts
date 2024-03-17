import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoModel } from './pedido.model';
import { PedidoItemDto } from '../../dtos';

@Entity("PedidoItem")
export class PedidoItemModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  quantidade: number;

  @ManyToOne(() => PedidoModel, (pedido) => pedido.itens, { nullable: false })
  pedido: PedidoModel;

  @Column({
    nullable: false
  })
  idProduto: number;

  @Column({
    nullable: false
  })
  nomeProduto: string;

  constructor(item?: PedidoItemDto, pedidoEntity?: PedidoModel) {
    if (item) {
      this.id = item.id;
      this.quantidade = item.quantidade;
      this.nomeProduto = item.nomeProduto;
      this.idProduto = item.idProduto;
    }

    if (pedidoEntity) {
      this.pedido = pedidoEntity;
    }
  }

  public getDto(): PedidoItemDto {

    return new PedidoItemDto(
      this.quantidade,
      this.nomeProduto,
      this.idProduto,
      this.pedido?.id,
      this.id
    );
  }
}
