import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { ProfilesController } from './profiles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'],
          queue: 'profile_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ]),
  ],
  controllers: [ProfilesController], // отвечает за все марщруты связанные с профилем
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: APP_GUARD, useClass: RolesGuard},
  ], // вся логика по работе с профилем
})
export class ProfilesModule {}
