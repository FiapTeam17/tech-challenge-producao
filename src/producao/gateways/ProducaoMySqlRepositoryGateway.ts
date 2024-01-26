import { DataSource, Repository } from 'typeorm';
import { IProducaoRepositoryGateway } from '../interfaces';
import { PedidoItemModel, PedidoModel } from './models';
import { InternalServerErrorException, Logger, Optional } from '@nestjs/common';
import { PedidoDto, PedidoRetornoDto } from '../dtos';
import { PedidoStatusEnum, StatusPedidoEnumMapper } from '../types';

export class ProducaoMySqlRepositoryGateway implements IProducaoRepositoryGateway {
  private pedidoRepository: Repository<PedidoModel>;
  private pedidoItemRepository: Repository<PedidoItemModel>;

  constructor(private dataSource: DataSource, private logger: Logger) {
    this.pedidoRepository = this.dataSource.getRepository(PedidoModel);
    this.pedidoItemRepository = this.dataSource.getRepository(PedidoItemModel);
  }

  async receberPedido(pedido: PedidoDto): Promise<void> {
    try {
      const pedidoEntity = new PedidoModel(pedido);
      const pedidoEntityCreated = await this.pedidoRepository.save(pedidoEntity);

      if (pedidoEntity.itens) {
        for (let i = 0; i < pedidoEntity.itens.length; i++) {
          const item = pedidoEntity.itens[i];
          item.pedido = pedidoEntityCreated;
          await this.pedidoItemRepository.save(item);
        }
      }
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Não foi possível se conectar ao banco de dados!',
      );
    }
  }

  async atualizarStatus(pedido: PedidoDto): Promise<void> {
    try {
      const pedidoId = pedido.id as number;
      await this.pedidoRepository.update(pedidoId, {
        status: StatusPedidoEnumMapper.enumParaNumber(pedido.status),
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Não foi possível se conectar ao banco de dados!',
      );
    }
  }

  async obterEmAndamento(): Promise<PedidoDto[]> {
    try {
      const pedidos: PedidoDto[] = [];

      const pedidoEntity = await this.pedidoRepository
        .createQueryBuilder('ped')
        .where('ped.status in(:...status)', {
          status: [
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.RECEBIDO),
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.EM_PREPARACAO),
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.PRONTO),
          ],
        })
        .leftJoinAndSelect('ped.itens', 'item')
        .getMany();

      pedidoEntity.forEach((pe) => {
        pedidos.push(pe.getDto());
      });

      return pedidos;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Não foi possível se conectar ao banco de dados!',
      );
    }
  }

  async obterPorId(pedidoId: number): Promise<PedidoDto> {
    try {
      const pedidoEntity = await this.pedidoRepository.createQueryBuilder('ped')
        .where('ped.Id = :id',
          {
            id: pedidoId,
          })
        .leftJoinAndSelect('ped.itens', 'item')
        .getOne();
      return pedidoEntity?.getDto();
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Não foi possível se conectar ao banco de dados!',
      );
    }
  }

  async obterPedidos(): Promise<PedidoDto[]> {
    try {
      const pedidos: PedidoDto[] = [];
      const pedidoEntity = await this.pedidoRepository.createQueryBuilder('ped')
        .leftJoinAndSelect('ped.itens', 'item')
        .getMany();

      pedidoEntity.forEach(pe => {
        pedidos.push(pe.getDto());
      });

      return pedidos;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Não foi possível se conectar ao banco de dados!',
      );
    }
  }
}
