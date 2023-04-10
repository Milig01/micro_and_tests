import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { RolesGuard } from './roles.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ]),
  ],
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: APP_GUARD, useClass: RolesGuard},
  ],
  controllers: [RolesController],
})
export class RolesModule {}