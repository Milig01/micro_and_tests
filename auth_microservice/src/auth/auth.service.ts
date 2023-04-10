import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(email: string, password: string): Promise<any> { // проверяем введенный пользователем пароль с сохраненным
        let user = await this.userService.findOneByEmail(email);
        
        if (user && bcrypt.compareSync(password, user.hash)) {
            return {id: user.id, email: user.email, roles: user.roles};
        }

        return null;
    }

    async login(user: any) {
        let payload = {username: user.email, sub: user.id, roles: user.roles};

        return {acces_token: this.jwtService.sign(payload)};
    }
}
