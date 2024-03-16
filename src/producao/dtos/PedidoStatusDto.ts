import { PedidoStatusEnum } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoStatusDto {
  @ApiProperty({
    description: "Status",
    example: "EM_PREPARACAO"
  })
  public readonly status?: PedidoStatusEnum;
}
