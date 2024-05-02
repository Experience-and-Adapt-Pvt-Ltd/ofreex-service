/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app/app.module';
import { CartModule } from './cart.module';

async function bootstrap() {
  const app = await NestFactory.create(CartModule);
  app.enableCors({
    origin: '*',
  });
  const maxHeaderSize = process.env.HTTP_SERVER_MAX_HEADER_SIZE;

  if (maxHeaderSize) {
    app.getHttpServer().maxHeadersCount = parseInt(maxHeaderSize, 10);
  }
  const http2 = require('http2');

  const server = http2.createSecureServer({
    // ... other server options
    settings: {
      // Increase the maximum frame size (recommended value is a multiple of 16384)
      maxFrameSize: 131072, // 128 KB (example)
    },
  });
  const port = process.env.PORT || 4004;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
