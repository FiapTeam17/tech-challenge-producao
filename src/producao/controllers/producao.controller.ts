import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProducaoService } from '../services';
import { DATA_SOURCE } from '../../common/constants';
import { DataSource } from 'typeorm';
import {
  PedidoCriarDto,
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

  @Post('/receberPedido')
  @HttpCode(201)
  async receberPedido(@Body() pedidoDto: PedidoCriarDto): Promise<void> {
    await this.producaoService.receberPedido(pedidoDto);
  }

  @Get('/andamento')
  async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
    return await this.producaoService.obterEmAndamento();
  }

  @Patch('/:id/status')
  async atualizarStatus(@Param('id') id: number, @Body() pedidoDto: PedidoStatusDto): Promise<void> {
    if (pedidoDto.status === undefined) {
      throw new BadRequestException('Status deve ser informado');
    }
    await this.producaoService.atualizarStatus(
      id,
      StatusPedidoEnumMapper.stringParaEnum(pedidoDto.status as unknown as string),
    );
  }

  @Get('/obterPedidos')
  async obterPedidos(): Promise<PedidoRetornoDto[]> {
    return await this.producaoService.obterPedidos();
  }
}