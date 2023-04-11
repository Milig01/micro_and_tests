import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let table = [];
  let profileDto = {
    name: 'test',
    surname: 'test',
    age: 18,
    phoneNumber: '+78934234234',
    email: 'test@mail.ru',
    password: 'test-password',
  };
  let controller: ProfileController;
  let service = {
    create: jest.fn(entity => entity),
    findAll: jest.fn(() => {if (table.length == 0) return null; return table}),
    remove: jest.fn(id => profileDto),
  }
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{provide: ProfileService, useValue: service}],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    let result = await controller.create(profileDto);
    expect(result).toEqual(profileDto);
  });

  it('findAll', async () => {
    let result = await controller.findAll();
    expect(result).toBeNull();
  });
});
