import { AppModule } from "./app/listings.module";
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.enableCors({
    origin: "*",
  })
  await app.listen(4001)
}

bootstrap()