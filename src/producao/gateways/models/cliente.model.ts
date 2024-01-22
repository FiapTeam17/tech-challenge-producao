import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoModel } from "../models";

@Entity("Cliente")
export class ClienteModel {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    nome?: string;

    @OneToMany(() => PedidoModel, (pedido) => pedido.cliente)
    pedidos?: PedidoModel[];
}