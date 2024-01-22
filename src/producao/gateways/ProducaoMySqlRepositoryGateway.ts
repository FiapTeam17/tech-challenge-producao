import { DataSource, Repository } from 'typeorm';
import { IProducaoRepositoryGateway } from '../interfaces';
import { PedidoModel } from './models';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { PedidoDto } from '../dtos';
import { PedidoStatusEnum, StatusPedidoEnumMapper } from '../types';

export class ProducaoMySqlRepositoryGateway
  implements IProducaoRepositoryGateway {
  private pedidoRepository: Repository<PedidoModel>;
  // private pagamentoRepository: Repository<PagamentoModel>;

  constructor(
    private dataSource: DataSource,
    private logger: Logger,
  ) {
    this.pedidoRepository = this.dataSource.getRepository(PedidoModel);
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
            StatusPedidoEnumMapper.enumParaNumber(
              PedidoStatusEnum.EM_PREPARACAO,
            ),
            StatusPedidoEnumMapper.enumParaNumber(PedidoStatusEnum.PRONTO),
          ],
        })
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
      const pedidoEntity = await this.pedidoRepository.createQueryBuilder('ped').where('ped.Id = :id', 
        {
          id: pedidoId,
        })
        .leftJoinAndSelect('ped.cliente', 'cli')
        .leftJoinAndSelect('ped.itens', 'item')
        .leftJoinAndSelect('item.produto', 'prod')
        .leftJoinAndSelect('item.pedido', 'peditem')
        .getOne();
      return pedidoEntity?.getDto();
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Não foi possível se conectar ao banco de dados!',
      );
    }
  }

  async obterPorStatus(status: PedidoStatusEnum): Promise<PedidoDto[]> {
    try {
      const pedidos: PedidoDto[] = [];
      const pedidoEntity = await this.pedidoRepository
        .createQueryBuilder('ped')
        .where('ped.status = :status', {
          status: StatusPedidoEnumMapper.enumParaString(status),
        })
        .getMany();

      pedidoEntity.forEach((pe) => {
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
