import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';

import {
  AccountsController,
  ClientController,
  ManagerController,
  SavingsAccountsController,
  TransationAccountsController,
} from './controllers/index.controller';

@Module({
  imports: [DomainModule],
  controllers: [
    AccountsController,
    ClientController,
    ManagerController,
    SavingsAccountsController,
    TransationAccountsController,
  ],
})
export class ApplicationModule {}
