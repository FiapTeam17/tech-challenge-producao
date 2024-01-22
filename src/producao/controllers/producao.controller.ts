import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ProducaoService } from '../services';
import { DATA_SOURCE } from '../../common/constants';
import { DataSource } from 'typeorm';
import {
  PedidoEmAndamentoDto,
  PedidoRetornoDto,
  PedidoStatusDto,
} from '../dtos';
import { StatusPedidoEnumMapper } from '../types';

@Controller('/pedidos')
export class ProducaoController {
  private producaoService: ProducaoService;
  private readonly logger = new Logger(ProducaoController.name);
  constructor(@Inject(DATA_SOURCE) private dataSource: DataSource) {
    this.producaoService = new ProducaoService(this.dataSource, this.logger);
  }

  @Get('/andamento')
  async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
    return await this.producaoService.obterEmAndamento();
  }

  @Get('/:id')
  async obterPorId(@Param('id') id: number): Promise<PedidoRetornoDto> {
    const pedido = await this.producaoService.obterPorId(id);
    return pedido;
  }

  @Patch('/:id/status')
  async atualizarStatus(
    @Param('id') id: number,
    @Body() pedidoDto: PedidoStatusDto,
  ): Promise<void> {
    if (pedidoDto.status === undefined) {
      throw new BadRequestException('Status deve ser informado');
    }
    await this.producaoService.atualizarStatus(
      id,
      StatusPedidoEnumMapper.stringParaEnum(
        pedidoDto.status as unknown as string,
      ),
    );
  }

  @Get()
  async obterPedidosPorStatus(
    @Query('status') status: string,
  ): Promise<PedidoRetornoDto[]> {
    if (status === undefined || status === "") {
      throw new BadRequestException('Status deve ser informado');
    }
    return await this.producaoService.obterPorStatus(status);
  }
}
