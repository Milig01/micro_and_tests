import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientProxy, 
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    let userDto: UserDto = createProfileDto;
    let user = await this.authClient.send('createUser', userDto).forEach(value => user = value);
    if (!user) return null;

    let profileDto: ProfileDto = {id: user.id, ...createProfileDto};
    
    return await this.profileRepository.save(profileDto);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    return await this.profileRepository.findOneBy({id});
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    let existingProfile = await this.findOne(id);
    if (!existingProfile) return null;

    let userDto: UserDto = updateProfileDto;
    let user = await this.authClient.send('updateUser', userDto).forEach(value => user = value);

    let profileDto: ProfileDto = updateProfileDto;

    return await this.profileRepository.save(profileDto);
  }

  async remove(id: number) {
    let existingProfile = await this.findOne(id);
    if (!existingProfile) return null;

    let user = this.authClient.send('removeUser', id);

    return await this.profileRepository.remove(existingProfile);
  }
}
