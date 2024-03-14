import { PedidoStatusEnum } from './PedidoStatusEnum';
import { InternalServerErrorException } from '@nestjs/common';

export class StatusPedidoEnumMapper {
  static numberParaEnum(codigo?: number): PedidoStatusEnum {
    switch (codigo) {
      case 0:
        return PedidoStatusEnum.RECEBIDO;
      case 1:
        return PedidoStatusEnum.EM_PREPARACAO;
      case 2:
        return PedidoStatusEnum.PRONTO;
      case 3:
        return PedidoStatusEnum.FINALIZADO;
      default:
        throw new InternalServerErrorException('Status Inválido');
    }
  }

  static stringParaEnum(opcao?: string): PedidoStatusEnum {
    switch (opcao) {
      case 'RECEBIDO':
        return PedidoStatusEnum.RECEBIDO;
      case 'EM_PREPARACAO':
        return PedidoStatusEnum.EM_PREPARACAO;
      case 'PRONTO':
        return PedidoStatusEnum.PRONTO;
      case 'FINALIZADO':
        return PedidoStatusEnum.FINALIZADO;
      default:
        throw new InternalServerErrorException('Status Inválido');
    }
  }

  static enumParaString(status?: PedidoStatusEnum): string {
    switch (status) {
      case PedidoStatusEnum.RECEBIDO:
        return 'RECEBIDO';
      case PedidoStatusEnum.EM_PREPARACAO:
        return 'EM_PREPARACAO';
      case PedidoStatusEnum.PRONTO:
        return 'PRONTO';
      case PedidoStatusEnum.FINALIZADO:
        return 'FINALIZADO';
      default:
        throw new InternalServerErrorException('Status Inválido');
    }
  }

  static enumParaNumber(status?: PedidoStatusEnum): number {
    switch (status) {
      case PedidoStatusEnum.RECEBIDO:
        return 0;
      case PedidoStatusEnum.EM_PREPARACAO:
        return 1;
      case PedidoStatusEnum.PRONTO:
        return 2;
      case PedidoStatusEnum.FINALIZADO:
        return 3;

      default:
        throw new InternalServerErrorException('Status Inválido');
    }
  }
}
