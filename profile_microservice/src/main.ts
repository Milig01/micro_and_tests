import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {urls: ['amqp://localhost'], queue: 'profile_queue', queueOptions: {durable: false}}
  });
  await app.listen();
}
bootstrap();
