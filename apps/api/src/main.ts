/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';
import { setupSwagger } from './setup-swagger';
import { DEVELOPMENT } from '@api/common/constants/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.env');
  const tz: string = configService.get<string>('app.timezone');
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioning: boolean = configService.get<boolean>('app.versioning.on');
  const versioningPrefix: string = configService.get<string>(
    'app.versioning.prefix'
  );

  const logger = new Logger();

  // Global;
  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Versioning
  if (versioning) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: VERSION_NEUTRAL,
      prefix: versioningPrefix,
    });
  }

  setupSwagger(app);

  // Starts listening for shutdown hooks
  if (env !== DEVELOPMENT) {
    app.enableShutdownHooks();
  }

  await app.listen(port, host);
  logger.log(`==========================================================`);
  logger.log(`App Environment is ${env}`, 'NestApplication');
  logger.log(
    `App Language is ${configService.get<string>('app.language')}`,
    'NestApplication'
  );
  logger.log(
    `App Debug is ${configService.get<boolean>('app.debug')}`,
    'NestApplication'
  );
  logger.log(`App Versioning is ${versioning}`, 'NestApplication');
  logger.log(
    `App Http is ${configService.get<boolean>('app.httpOn')}`,
    'NestApplication'
  );
  logger.log(
    `App Task is ${configService.get<boolean>('app.taskOn')}`,
    'NestApplication'
  );
  logger.log(`App Timezone is ${tz}`, 'NestApplication');
  logger.log(
    `Database Debug is ${configService.get<boolean>('database.debug')}`,
    'NestApplication'
  );

  logger.log(`==========================================================`);

  logger.log(
    `Database running on ${configService.get<string>(
      'database.host'
    )}/${configService.get<string>('database.name')}`,
    'NestApplication'
  );
  logger.log(`Server running on ${await app.getUrl()}`, 'NestApplication');

  logger.log(`==========================================================`);
}

bootstrap();
