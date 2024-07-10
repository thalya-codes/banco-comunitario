import { Test, TestingModule } from '@nestjs/testing';
import { SavingsAccountController } from './savings_account.controller';

describe('SavingsAccountController', () => {
  let controller: SavingsAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingsAccountController],
    }).compile();

    controller = module.get<SavingsAccountController>(SavingsAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
