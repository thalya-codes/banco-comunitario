import { Test, TestingModule } from '@nestjs/testing';
import { TransactionAccountService } from '../transaction-account.service';

describe('TransactionAccountService', () => {
  let service: TransactionAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionAccountService],
    }).compile();

    service = module.get<TransactionAccountService>(TransactionAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
