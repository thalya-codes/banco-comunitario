import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Manager } from './manager.model';
import { Client } from 'src/client/client.model';
import { Account } from 'src/account/account.model';
import { ACCOUNT_TYPE } from 'src/enums';
import {
  EXISTENT_CLIENT,
  INSUFICIENT_INCOME_SALARY,
  NOT_EXISTENT_CLIENT,
} from 'src/constants';

@Injectable()
export class ManagerService extends Manager {
  protected _id: string = uuidv4();
  protected _clients: Client[];
  protected _fullname: string;

  protected verifyIfClientExists(client: Client, message: string): void {
    const isClientAlreadyExistent: boolean = this._clients.some(
      ({ id }) => id === client.id,
    );

    if (!isClientAlreadyExistent) {
      throw new Error(message);
    }
  }

  addClient(client: Client): void {
    this.verifyIfClientExists(client, EXISTENT_CLIENT);
    this._clients.push(client);
  }

  removeClient(client: Client): void {
    this.verifyIfClientExists(client, NOT_EXISTENT_CLIENT);
    this._clients = this._clients.filter(({ id }) => id !== client.id);
  }

  openAccount(client: Client, accountType: string): void {
    let account: Account;

    if (accountType === ACCOUNT_TYPE.TRANSACTION) {
      if (client.salaryIncome < 500) {
        throw new Error(INSUFICIENT_INCOME_SALARY);
      }

      //instanciar TRANSACTION ACCOUNT
    } else {
      //instancia SAVINGS ACCOUNT
    }

    client.openAccount(account);
  }

  closeAccount(client: Client, account: Account): void {
    client.closeAccount(account);
  }

  alterAccountType(client: Client, account: Account, newType: string): void {
    this.verifyIfClientExists(client, NOT_EXISTENT_CLIENT);
    client.alterAccountType(account, newType);
  }
}
