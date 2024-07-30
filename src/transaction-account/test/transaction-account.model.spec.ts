import { Test, TestingModule } from '@nestjs/testing';
import { TransationAccount } from '../transaction-account.model';

describe('TransactionAccount', () => {
  let service: TransationAccount;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransationAccount],
    }).compile();

    service = module.get<TransationAccount>(TransationAccount);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
