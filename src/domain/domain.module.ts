import { Module } from '@nestjs/common';
import {
  AccountsService,
  ClientService,
  ManagerService,
  SavingsAccountService,
  TransactionAccountService,
} from 'src/domain/services/index.service';
import {
  ClientFactory,
  SavingsAccountFactory,
  TransactionAccountFactory,
} from './factory/index.factory';

@Module({
  providers: [
    AccountsService,
    ClientService,
    ManagerService,
    SavingsAccountService,
    TransactionAccountService,
    ClientFactory,
    SavingsAccountFactory,
    TransactionAccountFactory,
  ],
  exports: [
    AccountsService,
    ClientService,
    SavingsAccountService,
    TransactionAccountService,
  ],
})
export class DomainModule {}
