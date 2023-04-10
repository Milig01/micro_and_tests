import { Body, Controller, Delete, Get, Inject, Param, Post, Request } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { ClientProxy } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
    constructor(@Inject('AUTH_MICROSERVICE') private clientAuth: ClientProxy) {}

    @Post()
    @Roles('Admin')
    addRole(@Body() {userId, roleId}) {
        return this.clientAuth.send('addRoleToUser', {userId, roleId});
    }

    @Delete()
    @Roles('Admin')
    deleteUserRole(@Body() {userId, roleId}) {
        return this.clientAuth.send('removeRoleFromUser', {userId, roleId});
    }
}
