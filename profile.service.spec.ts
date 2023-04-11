import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ClientProxy } from '@nestjs/microservices';
import { ProfileDto } from './dto/profile.dto';

describe('ProfileService', () => {
  let profileDto = {
    name: 'test',
    surname: 'test',
    age: 18,
    phoneNumber: '+78934234234',
    email: 'test@mail.ru',
    password: 'test-password',
  };
  let service: ProfileService;
  let mockRepository = jest.fn(() => ({
    save: jest.fn((entity => entity)),
    find: jest.fn((() => profileDto)),
    findOneBy: jest.fn((entity => profileDto)),
    findOne: jest.fn((entity => entity)),
    remove: jest.fn((entity => profileDto)),
  }));
  let clientFactory = jest.fn(() => ({
    send: jest.fn((pattern: string, entity: ProfileDto) => ({...entity, forEach: jest.fn(() => profileDto)}))
  }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {provide: getRepositoryToken(Profile), useFactory: mockRepository},
        {provide: 'AUTH_MICROSERVICE', useFactory: clientFactory},
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    let result = await service.create(profileDto);
    expect(result).toEqual(profileDto);
  })

  it('findAll', async () => {
    let result = await service.findAll();
    expect(result).toEqual(profileDto);
  })

  it('remove', async () => {
    let result = await service.remove(1);
    expect(result).toEqual(profileDto);
  })
});
