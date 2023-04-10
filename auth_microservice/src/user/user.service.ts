import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    let existingUser = await this.userRepository.findOneBy({email: createUserDto.email});
    if (existingUser) return null;

    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(createUserDto.password, salt);
    let user = {email: createUserDto.email, hash};

    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let existingUser = await this.findOne(id);
    if (!existingUser) return null;

    return await this.userRepository.save(updateUserDto);
  }

  async remove(id: number) {
    let existingUser = await this.findOne(id);
    if (!existingUser) return null;

    return await this.userRepository.remove(existingUser);
  }

  async addRole(userId: number, roleId: number) {
    return await this.userRepository.createQueryBuilder()
    .relation(User, 'roles').of(userId).add(roleId);
  }

  async removeRole(userId: number, roleId: number) {
    return await this.userRepository.createQueryBuilder()
    .relation(User, 'roles').of(userId).remove(roleId);
  }
}
