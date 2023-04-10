import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneBy({id});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    let existingRole = this.findOne(id);
    if (!existingRole) return null;

    return await this.roleRepository.save(updateRoleDto);
  }

  async remove(id: number) {
    let existingRole = await this.findOne(id);
    if (!existingRole) return null;

    return await this.roleRepository.remove(existingRole);
  }
}
