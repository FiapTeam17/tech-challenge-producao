import { Module } from '@nestjs/common';
import { DatabaseModule } from '../config/database';
import { producaoProviders } from './producao.providers';
import { ProducaoController } from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProducaoController],
  providers: [...producaoProviders],
})
export class ProducaoModule {}
