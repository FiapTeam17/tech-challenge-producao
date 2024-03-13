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
import { ISqsGateway } from '../interfaces/ISqsGateway';
import { AwsConfigService } from '../../config/aws';
import { SqsGateway } from '../gateways/SqsGateway';

export class ProducaoService {
  private readonly producaoRepositoryGateway: IProducaoRepositoryGateway;
  private readonly obterPedidoUseCase: IObterPedidoUseCase;
  private readonly atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase;
  private readonly receberPedidoUseCase: IReceberPedidoUseCase;
  private readonly sqsGateway: ISqsGateway;

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

    let awsConfigService = new AwsConfigService();
    this.sqsGateway = new SqsGateway(awsConfigService);

    this.atualizarStatusPedidoUseCase = new AtualizarStatusPedidoUseCase(
      this.producaoRepositoryGateway,
      this.sqsGateway,
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
