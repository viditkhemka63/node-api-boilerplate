import { ConfigModule } from '@config';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DebuggerModule } from '../debugger/debugger.module';
import { DebuggerOptionService } from '../debugger/service/debugger.option.service';
import { MessageModule } from '../message/message.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ErrorModule } from '../utils/error/error.module';
import { HelperModule } from '../utils/helper/helper.module';
import { MiddlewareModule } from '../utils/middleware/middleware.module';
import { VersionModule } from '../utils/version/version.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule,
    WinstonModule.forRootAsync({
      inject: [DebuggerOptionService],
      imports: [DebuggerModule],
      useFactory: (debuggerOptionsService: DebuggerOptionService) =>
        debuggerOptionsService.createLogger(),
    }),
    HelperModule,
    MiddlewareModule,
    // RequestModule,
    ErrorModule,
    VersionModule,
    PaginationModule,
    MessageModule,
  ],
  exports: [],
})
export class CoreModule {}
