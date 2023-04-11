import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let profileDto = {
    name: 'test',
    surname: 'test',
    age: 18,
    phoneNumber: '+78934234234',
    email: 'test@mail.ru',
    password: 'test-password',
  };
  let app: INestApplication;
  let clientAuth = {
    send: jest.fn((pattern, data) => data),
  };
  let clientProfile = {
    send: jest.fn((pattern, data) => data),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService,
        {provide: 'AUTH_MICROSERVICE', useValue: clientAuth},
        {provide: 'PROFILE_MICROSERVICE', useValue: clientProfile},
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/registration (POST)', () => {
    return request(app.getHttpServer())
      .post('/registration')
      .set(profileDto)
      .expect(200)
      .expect(profileDto);
  });
});
