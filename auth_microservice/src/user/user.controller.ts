import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUser')
  async findAll() {
    return await this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: number) {
    return await this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  async update(@Payload() updateUserDto: UpdateUserDto) {
    return await this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: number) {
    return await this.userService.remove(id);
  }

  @MessagePattern('addRoleToUser')
  async addRole(@Payload() userId: number, @Payload() roleId: number) {
    return await this.userService.addRole(userId, roleId);
  }

  @MessagePattern('removeRoleFromUser')
  async removeRole(@Payload() userId: number, @Payload() roleId: number) {
    return await this.userService.removeRole(userId, roleId);
  }
}
