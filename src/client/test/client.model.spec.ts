import { Test, TestingModule } from '@nestjs/testing';
import { Client } from '../client.model';

describe('Client', () => {
  let service: Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Client],
    }).compile();

    service = module.get<Client>(Client);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
