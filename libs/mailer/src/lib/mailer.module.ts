import { ConfigModule } from '@config';
import { Module } from '@nestjs/common';
import { MailerModule as CoreMailerModule } from '@nestjs-modules/mailer';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MAILER_SERVICE } from './constants';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    ConfigModule,
    CoreMailerModule.forRootAsync({
      imports: [NestConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get('mailer.transport.host'),
            port: config.get('mailer.transport.port'),
            secure: true,
            auth: {
              user: config.get('mailer.transport.auth.user'),
              pass: config.get('mailer.transport.auth.pass'),
            },
          },
          defaults: {
            from: '"Saas Platform" <no-reply@impulsiveweb.in>',
          },
          template: {
            dir: config.get('mailer.template.dir'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: MAILER_SERVICE,
      useClass: MailerService,
    },
  ],
  exports: [
    {
      provide: MAILER_SERVICE,
      useClass: MailerService,
    },
  ],
})
export class MailerModule {}
