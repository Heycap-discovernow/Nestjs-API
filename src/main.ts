import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './infraestructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
