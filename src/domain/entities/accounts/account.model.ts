import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AccountAbstract, TPaymentType } from './account.abstract.model';
import { ErrorMessages } from 'src/domain/enums/errors-messages';

@Injectable()
export class Account extends AccountAbstract {
  protected _balance: number = 0.0;
  protected _accountType: string;
  protected _clientId: string;

  constructor(accountType: string, clientId: string) {
    super();
    this._accountType = accountType;
    this._clientId = clientId;
  }

  deposit(amount: number): void {
    this._balance += amount;
  }

  transfer(destination: AccountAbstract, amount: number): void {
    if (amount > this._balance) {
      throw new HttpException(ErrorMessages.INSUFICIENT_BALANCE, 400);
    }

    destination.deposit(amount);
    this._balance -= amount;
  }

  verifyBalance(): number {
    return this._balance;
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      throw new HttpException(ErrorMessages.INSUFICIENT_BALANCE, 400);
    }
    this._balance -= amount;
  }

  generateAccountNumber(): string {
    return uuidv4().replace(/-/g, '').slice(0, 13);
  }

  set accountType(newType: string) {
    this._accountType = newType;
  }

  get accountType(): string {
    return this._accountType;
  }

  get clientId(): string {
    return this._clientId;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  set accountNumber(accountNumber: string) {
    this._accountNumber = accountNumber;
  }

  payBill(
    amount: number,
    destinationAccount: AccountAbstract,
    method: TPaymentType,
    dueate?: string,
  ): void {}
}
