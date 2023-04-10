import { Body, Controller, Get, Delete, Param, Inject, Req } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { ClientProxy } from '@nestjs/microservices';

@Controller('profiles')
export class ProfilesController {
    constructor(@Inject('PROFILE_MICROSERVICE') private readonly clientProfile: ClientProxy) {}
    
    @Get()
    getOurProfile(@Req() request) { // получить профиль с которого авторизовались
        return this.clientProfile.send('findOneProfile', request.user.id);
    }

    @Delete()
    deleteOurProfile(@Req() request) {
        return this.clientProfile.send('removeProfile', request.user.id);
    }

    @Roles('Admin')
    @Get(':id') // получить либо по id либо всех, указав all
    getOneProfile(@Param('id') id: string) {
        if (id == 'all') return this.clientProfile.send('findAllProfile', null);

        return this.clientProfile.send('findOneProfile', +id);
    }

    @Roles('Admin')
    @Delete(':id')
    deleteProfile(@Param('id') id: number) {
        return this.clientProfile.send('removeProfile', id);
    }
}
