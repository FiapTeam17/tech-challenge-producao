import { PedidoEntity } from './PedidoEntity';
import { PedidoItemDto } from '../dtos/PedidoItemDto';

export class PedidoItemEntity {
    get id(): number | undefined {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get pedido(): PedidoEntity | undefined {
        return this._pedido;
    }

    set pedido(value: PedidoEntity) {
        this._pedido = value;
    }

    get quantidade(): number | undefined {
        return this._quantidade;
    }

    set quantidade(value: number) {
        this._quantidade = value;
    }

    get idProduto(): number | undefined {
        return this._idProduto;
    }

    set idProduto(value: number) {
        this._idProduto = value;
    }

    constructor(
        public _id?: number,
        public _pedido?: PedidoEntity,
        public _quantidade?: number,
        public _idProduto?: number,
        public _nomeProduto?: string,
    ) { }
}
