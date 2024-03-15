import { PedidoStatusEnum } from '../types';
import { PedidoDto, PedidoItemDto } from '../dtos';
import { BadRequestException } from '@nestjs/common';
import { PedidoItemEntity } from './PedidoItemEntity';

export class PedidoEntity {
  get dataCadastro(): Date | undefined {
    return this._dataCadastro;
  }

  set dataCadastro(value: Date) {
    this._dataCadastro = value;
  }

  get dataConclusao(): Date | undefined {
    return this._dataConclusao;
  }
  set dataConclusao(value: Date) {
    this._dataConclusao = value;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get observacao(): string | undefined {
    return this._observacao;
  }

  set observacao(value: string) {
    this._observacao = value;
  }

  get status(): PedidoStatusEnum | undefined {
    return this._status;
  }

  set status(value: PedidoStatusEnum) {
    this._status = value;
  }

  get itens(): PedidoItemEntity[] | undefined {
    return this._itens;
  }

  set itens(value: PedidoItemEntity[] | undefined) {
    this._itens = value;
  }

  get identificacaoPedido(): number | undefined {
    return this._identificacaoPedido;
  }

  set identificacaoPedido(value: number) {
    this._identificacaoPedido = value;
  }

  get identificacaoCliente(): string | undefined {
    return this._identificacaoCliente;
  }

  set identificacaoCliente(value: string) {
    this._identificacaoCliente = value;
  }

  constructor(
    private _id?: number,
    private _observacao?: string,
    private _status?: PedidoStatusEnum,
    private _dataCadastro?: Date,
    private _dataConclusao?: Date,
    private _itens?: PedidoItemEntity[],
    private _identificacaoPedido?: number,
    private _identificacaoCliente?: string,
  ) { }

  static getInstancia(id: number, status: PedidoStatusEnum): PedidoEntity {
    const pedido = new PedidoEntity();
    pedido._id = id;
    pedido._status = status;
    return pedido;
  }

  setStatus(newStatus: PedidoStatusEnum) {
    switch (newStatus) {
      case PedidoStatusEnum.EM_PREPARACAO:
        if (this._status === PedidoStatusEnum.RECEBIDO) {
          this._status = newStatus;
          break;
        }
        throw new BadRequestException(
          'O status do pedido não permite essa alteração',
        );

      case PedidoStatusEnum.PRONTO:
        if (this._status === PedidoStatusEnum.EM_PREPARACAO) {
          this._status = newStatus;
          this._dataConclusao = new Date(Date.now());
          break;
        }
        throw new BadRequestException(
          'O status do pedido não permite essa alteração',
        );

      case PedidoStatusEnum.FINALIZADO:
        if (this._status === PedidoStatusEnum.PRONTO) {
          this._status = newStatus;
          break;
        }
        throw new BadRequestException(
          'O status do pedido não permite essa alteração',
        );
    }
  }

  public getStatus(): PedidoStatusEnum {
    if (this._status === undefined) {
      this._status = PedidoStatusEnum.RECEBIDO;
    }
    return this._status;
  }

  public tempoEspera(): number {
    let dataFim: number = Date.now();
    if (this._dataConclusao) {
      dataFim = this._dataConclusao.getTime();
    }
    return (
      dataFim -
      (this._dataCadastro !== undefined
        ? this._dataCadastro?.getTime()
        : Date.now())
    );
  }

  public toPedidoDto(): PedidoDto {

    const itens = this.itens?.map(i => {
      return new PedidoItemDto(
        i.quantidade,
        i._nomeProduto,
        i.idProduto,
        i.pedido.id,
        i.id
      );
    });

    return new PedidoDto(
      this.identificacaoPedido,
      this._identificacaoCliente,
      this.status as never,
      this.dataCadastro as never,
      itens,
      this.observacao,
      this.dataConclusao,
      this.id,
    );
  }

  static getInstance(pedidoDto: PedidoDto): PedidoEntity {
    const pedido = new PedidoEntity(
      pedidoDto.id,
      pedidoDto.observacao,
      pedidoDto.status,
      pedidoDto.dataCadastro,
      pedidoDto.dataConclusao,
      undefined,
      pedidoDto.identificacaoPedido,
      pedidoDto.identificacaoCliente,
    );

    pedido.itens = pedidoDto.itens?.map(i => {
      return new PedidoItemEntity(
        i.id,
        pedido,
        i.quantidade,
        i.idProduto,
        i.nomeProduto
      );
    });

    return pedido;
  }
}
