import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern('createRole')
  async create(@Payload() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @MessagePattern('findAllRole')
  async findAll() {
    return await this.roleService.findAll();
  }

  @MessagePattern('findOneRole')
  async findOne(@Payload() id: number) {
    return await this.roleService.findOne(id);
  }

  @MessagePattern('updateRole')
  async update(@Payload() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(updateRoleDto.id, updateRoleDto);
  }

  @MessagePattern('removeRole')
  async remove(@Payload() id: number) {
    return await this.roleService.remove(id);
  }
}
