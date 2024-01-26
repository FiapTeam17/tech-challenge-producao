import {
  IAtualizarStatusPedidoUseCase,
  IObterPedidoUseCase,
  IProducaoRepositoryGateway,
  IReceberPedidoUseCase,
} from '../interfaces';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ProducaoMySqlRepositoryGateway } from '../gateways';

import { AtualizarStatusPedidoUseCase, ObterPedidoUseCase, ReceberPedidoUseCase } from '../usecases';
import { PedidoCriarDto, PedidoEmAndamentoDto, PedidoRetornoDto } from '../dtos';
import { PedidoStatusEnum } from '../types';

export class ProducaoService {
  private readonly producaoRepositoryGateway: IProducaoRepositoryGateway;
  private readonly obterPedidoUseCase: IObterPedidoUseCase;
  private readonly atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase;
  private readonly receberPedidoUseCase: IReceberPedidoUseCase;

  constructor(
    private dataSource: DataSource,
    private logger: Logger,
  ) {
    this.producaoRepositoryGateway = new ProducaoMySqlRepositoryGateway(
      dataSource,
      logger,
    );

    this.obterPedidoUseCase = new ObterPedidoUseCase(
      this.producaoRepositoryGateway,
      logger,
    );

    this.atualizarStatusPedidoUseCase = new AtualizarStatusPedidoUseCase(
      this.producaoRepositoryGateway,
      logger,
    );

    this.receberPedidoUseCase = new ReceberPedidoUseCase(
      this.producaoRepositoryGateway,
      logger,
    );
  }

  async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
    return await this.obterPedidoUseCase.obterEmAndamento();
  }

  async obterPedidos(): Promise<PedidoRetornoDto[]> {
    return await this.obterPedidoUseCase.obterPedidos();
  }

  async atualizarStatus(pedidoId: number, status: PedidoStatusEnum,): Promise<void> {
    return await this.atualizarStatusPedidoUseCase.atualizarStatus(pedidoId, status,);
  }

  async receberPedido(pedido: PedidoCriarDto): Promise<void> {
    return await this.receberPedidoUseCase.receberPedido(pedido);
  }
}
