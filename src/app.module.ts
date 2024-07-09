import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountService } from './account/service/account.service';
import { BankingController } from './account/account.controller';
import { TransationAccountService } from './transation-account/service/transation-account.service';
import { TransationAccountController } from './transation-account/controller/transation-account.controller';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    BankingController,
    TransationAccountController,
    ClientController,
  ],
  providers: [
    AppService,
    AccountService,
    TransationAccountService,
    ClientService,
  ],
})
export class AppModule {}
