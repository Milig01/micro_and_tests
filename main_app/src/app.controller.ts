import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('PROFILE_MICROSERVICE') private readonly clientProfile: ClientProxy,
    @Inject('AUTH_MICROSERVICE') private readonly clientAuth: ClientProxy,
  ) {}

  @Post('auth/login')
  async login(@Req() request) {
    return this.clientAuth.send('authLogin', request); // возвращается токен
  }

  @Post('registration')
  async profileRegister(@Body() createProfileDto) {
    return this.clientProfile.send('createProfile', createProfileDto);
  }
}
