import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { TextBlock } from './text_block.entity';
import { TextBlockController } from './text_block.controller';
import { TextBlockService } from './text_block.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TextBlock]),
    FilesModule
  ],
  controllers: [TextBlockController],
  providers: [
    TextBlockService,
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: APP_GUARD, useClass: RolesGuard},
  ]
})
export class TextBlockModule {}
