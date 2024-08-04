import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ManagerAbstract } from 'src/domain/entities/manager/manager.abstract.model';
import { Client } from 'src/domain/entities/client/client.model';
import { AccountAbstract } from 'src/domain/entities/accounts/account.abstract.model';
import { ACCOUNT_TYPE } from 'src/domain/enums/enums';
import { SavingsAccountService } from 'src/domain/services/savings_account.service';
import { ErrorMessages } from 'src/domain/enums/errors-messages';
import { TransactionAccountService } from 'src/domain/services/transaction-account.service';
import { TransactionAccountFactory } from '../factory/transaction_account.factory';
import { SavingsAccountFactory } from '../factory/savings_account.factory';

@Injectable()
export class ManagerService extends ManagerAbstract {
  protected _id: string = uuidv4();
  protected _clients: Client[] = [];
  protected _fullname: string;

  protected verifyIfClientExists(client: Client, message: string): void {
    const isClientAlreadyExistent: boolean = this._clients.some(
      ({ id }) => id === client.id,
    );

    if (isClientAlreadyExistent) {
      throw new Error(message);
    }
  }

  addClient(client: Client): void {
    this.verifyIfClientExists(client, ErrorMessages.EXISTENT_CLIENT);
    this._clients.push(client);
  }

  removeClient(client: Client): void {
    this.verifyIfClientExists(client, ErrorMessages.NOT_EXISTENT_CLIENT);
    this._clients = this._clients.filter(({ id }) => id !== client.id);
  }

  openAccount(client: Client, accountType: string, interestRate = 0.12): void {
    let account: AccountAbstract;

    if (accountType === ACCOUNT_TYPE.TRANSACTION) {
      if (client.salaryIncome < 500) {
        throw new Error(ErrorMessages.INSUFICIENT_INCOME_SALARY);
      }

      account = new TransactionAccountService(
        new TransactionAccountFactory(),
      ).createAccount(client.id);
    } else {
      account = new SavingsAccountService(
        new SavingsAccountFactory(),
      ).createAccount(client.id, interestRate);
    }

    client.openAccount(account);
  }

  closeAccount(client: Client, account: AccountAbstract): void {
    client.closeAccount(account);
  }

  alterAccountType(
    client: Client,
    account: AccountAbstract,
    newType: string,
  ): void {
    this.verifyIfClientExists(client, ErrorMessages.NOT_EXISTENT_CLIENT);
    client.alterAccountType(account, newType);
  }
}
