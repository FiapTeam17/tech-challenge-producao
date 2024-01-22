import { IAtualizarStatusPedidoUseCase, IObterPedidoUseCase } from './interfaces';
import { AtualizarStatusPedidoUseCase, ObterPedidoUseCase } from './usecases';

export const producaoProviders = [
    {
        provide: IAtualizarStatusPedidoUseCase,
        useFactory: () => AtualizarStatusPedidoUseCase
    },
    {
        provide: IObterPedidoUseCase,
        useFactory: () => ObterPedidoUseCase
    }
];
