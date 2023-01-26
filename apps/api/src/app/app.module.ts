import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RouterModule } from '@api/router/router.module';
import { DatabaseModule } from '@api/database/database.module';
import { CoreModule } from '@core/lib/core.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtGuard } from '@api/common/gaurds/jwt.guard';
import { ResponseTransformInterceptor } from '@api/common/interceptors/response.interceptor';

@Module({
  imports: [DatabaseModule, CoreModule, RouterModule.register()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: WorkspaceGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule {}
