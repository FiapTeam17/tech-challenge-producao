import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Produto")
export class ProdutoModel {
    @PrimaryGeneratedColumn()
    id?: number;
}
