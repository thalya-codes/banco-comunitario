import { Test, TestingModule } from '@nestjs/testing';
import { TransationAccountService } from '../transation-account.service';

describe('TransationAccountService', () => {
  let service: TransationAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransationAccountService],
    }).compile();

    service = module.get<TransationAccountService>(TransationAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
