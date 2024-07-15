import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientController } from './client/client.controller';
import { ManagerService } from './manager/manager.service';
import { ManagerController } from './manager/manager.controller';
import { TransationAccountController } from './transaction-account/transaction-account.controller';
import { AccountController } from './account/account.controller';
import { SavingsAccountService } from './savings_account/savings_account.model';
import { SavingsAccountController } from './savings_account/savings_account.controller';
import { ClientService } from './client/client.service';
import { AccountService } from './account/account.service';
import { TransactionAccountService } from './transaction-account/transaction-account.service';
import { SavingsAccountService } from './savings-account/savings-account.service';
import { SavingsAccountService } from './savings_account/savings_account.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AccountController,
    TransationAccountController,
    ClientController,
    ManagerController,
    SavingsAccountController,
  ],
  providers: [
    AppService,
    AccountService,
    TransactionAccountService,
    ClientService,
    ManagerService,
    SavingsAccountService,
    TransactionAccountService,
  ],
})
export class AppModule {}
