import { IProducaoRepositoryGateway, IReceberPedidoUseCase } from '../interfaces';
import { Logger } from '@nestjs/common';
import { PedidoCriarDto } from '../dtos';
import { PedidoEntity } from '../entities';
import { PedidoItemEntity } from '../entities/PedidoItemEntity';
import { PedidoStatusEnum } from '../types';

export class ReceberPedidoUseCase implements IReceberPedidoUseCase {

    constructor(
        private producaoRepositoryGateway: IProducaoRepositoryGateway,
        private logger: Logger
    ) { }
    async receberPedido(pedidoDto: PedidoCriarDto): Promise<void> {
        const pedido = this.dtoToDomain(pedidoDto);
        await this.producaoRepositoryGateway.receberPedido(pedido.toPedidoDto());
    }

    private dtoToDomain(pedidoDto: PedidoCriarDto): PedidoEntity {
        const pedido = new PedidoEntity(undefined, pedidoDto.observacao, PedidoStatusEnum.RECEBIDO, new Date(Date.now()),
            undefined, null, pedidoDto.identificacaoPedido, pedidoDto.identificacaoCliente);

        pedido.itens = pedidoDto.itens.map(i => {
            return new PedidoItemEntity(undefined, pedido, i.quantidade, i.produtoId, i.nomeProduto);
        });

        return pedido;
    }
}
