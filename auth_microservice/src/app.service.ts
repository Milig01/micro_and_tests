import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {

  @MessagePattern({cmd: 'cmd'})
  async getHello(data: string) {
    return data;
  }
}
