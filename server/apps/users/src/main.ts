import { NestFactory } from '@nestjs/core';
import { UsersModule } from './app/users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'server/email-template'));
  app.setViewEngine('ejs');

  app.enableCors({
    origin: "*"
  });

  await app.listen(4001);
}
bootstrap();
