import {
  IAtualizarStatusPedidoUseCase,
  IObterPedidoUseCase,
  IProducaoRepositoryGateway,
} from '../interfaces';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ProducaoMySqlRepositoryGateway } from '../gateways';

import { AtualizarStatusPedidoUseCase, ObterPedidoUseCase } from '../usecases';
import { PedidoEmAndamentoDto, PedidoRetornoDto } from '../dtos';
import { PedidoStatusEnum } from '../types';

export class ProducaoService {
  private readonly producaoRepositoryGateway: IProducaoRepositoryGateway;
  private readonly obterPedidoUseCase: IObterPedidoUseCase;
  private readonly atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase;

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
  }

  async obterPorId(id: number): Promise<PedidoRetornoDto> {
    return await this.obterPedidoUseCase.obterPorId(id);
  }

  async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
    return await this.obterPedidoUseCase.obterEmAndamento();
  }

  async obterPorStatus(status: string): Promise<PedidoRetornoDto[]> {
    return await this.obterPedidoUseCase.obterPorStatus(status);
  }

  async atualizarStatus(
    pedidoId: number,
    status: PedidoStatusEnum,
  ): Promise<void> {
    return await this.atualizarStatusPedidoUseCase.atualizarStatus(
      pedidoId,
      status,
    );
  }
}
