import { Module } from '@nestjs/common';
import { ProducaoModule } from './producao/producao.module';

@Module({
  imports: [ProducaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
