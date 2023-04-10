import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '60m'}
    })
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
