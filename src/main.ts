import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // corrige erro de CORS qdo app roda no browser
  await app.listen(3000);
}
bootstrap();
