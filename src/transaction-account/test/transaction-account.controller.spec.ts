import { Test, TestingModule } from '@nestjs/testing';
import { TransationAccountController } from '../transaction-account.controller';

describe('TransationAccountController', () => {
  let controller: TransationAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransationAccountController],
    }).compile();

    controller = module.get<TransationAccountController>(
      TransationAccountController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
