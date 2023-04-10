import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TextBlockModule } from './text_block/text_block.module';
import { RolesModule } from './roles/roles.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlock } from './text_block/text_block.entity';
import { File } from './files/files.entity';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.development.env`,
      isGlobal: true
    }),
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [TextBlock, File],
    }),
    TextBlockModule,
    RolesModule,
    FilesModule,
    AuthModule,
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
