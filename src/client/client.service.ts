import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Account } from '../account/account.model';
import { Client } from './client.model';

@Injectable()
export class ClientService extends Client {
  protected _id: string = uuidv4();

  constructor(
    protected _fullname: string,
    protected _address: string,
    protected _telphone: string,
    protected _manager: any,
    protected _accounts: Account[],
  ) {
    super();
  }

  openAccount(account: Account): void {
    this._accounts.push(account);
  }

  alterAccountType(account: Account, newType: string): void {
    const foundAccountIndex = this._accounts.findIndex(
      ({ clientId }) => clientId === account.clientId,
    );

    if (foundAccountIndex === -1) {
      throw new Error('Não foi possível encontrar a conta');
    }

    account.accountType = newType;
  }

  closeAccount(account: Account): void {
    this._accounts = this._accounts.filter(
      ({ accountNumber }) => accountNumber !== account.accountNumber,
    );
  }

  get id(): string {
    return this._id;
  }

  get fullname(): string {
    return this._fullname;
  }

  get address(): string {
    return this._address;
  }

  get telphone(): string {
    return this._telphone;
  }

  get manager(): string {
    return this._manager;
  }

  get accounts(): Account[] {
    return this._accounts;
  }

  set accounts(account: Account) {
    this._accounts.push(account);
  }

  set manager(manager: string) {
    this._manager = manager;
  }

  set telphone(telphone: string) {
    this._telphone = telphone;
  }

  set address(address: string) {
    this._address = address;
  }

  set fullname(fullname: string) {
    this._fullname = fullname;
  }
}
