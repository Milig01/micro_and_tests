import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LocalAuthGuard } from './local_auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern('authLogin')
    @UseGuards(LocalAuthGuard)
    async authLogin(@Payload() request) {
        return await this.authService.login(request.user);
    }
}
