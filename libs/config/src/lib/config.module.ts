import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Configs from '../config/index';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigModule {}
