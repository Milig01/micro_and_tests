import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('createProfile')
  async create(@Payload() createProfileDto: CreateProfileDto) {
    return await this.profileService.create(createProfileDto);
  }

  @MessagePattern('findAllProfile')
  async findAll() {
    return await this.profileService.findAll();
  }

  @MessagePattern('findOneProfile')
  async findOne(@Payload() id: number) {
    return await this.profileService.findOne(id);
  }

  @MessagePattern('updateProfile')
  async update(@Payload() updateProfileDto: UpdateProfileDto) {
    return await this.profileService.update(updateProfileDto.id, updateProfileDto);
  }

  @MessagePattern('removeProfile')
  async remove(@Payload() id: number) {
    return await this.profileService.remove(id);
  }
}
