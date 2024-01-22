import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoModel } from './pedido.model';
import { PedidoItemDto } from '../../dtos';
import { ProdutoModel } from "../models"

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

  @ManyToOne(() => ProdutoModel, { nullable: false })
  produto: ProdutoModel;
}
