import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Account } from './account.model';
import { v4 as uuidv4 } from 'uuid';
import { NOT_FOUND_ACCOUNT } from 'src/constants';

@Injectable()
export class AccountsService {
  private accounts: { [key: string]: Account } = {};

  createAccount(
    accountType: string,
    clientId: string,
  ): { accountNumber: string } {
    const accountNumber = uuidv4().replace(/-/g, '').slice(0, 13);
    const newAccount = new Account(accountType, clientId);
    newAccount.accountNumber = accountNumber;
    this.accounts[accountNumber] = newAccount;
    return { accountNumber };
  }

  deposit(accountNumber: string, amount: number): { balance: number } {
    const account = this.getAccount(accountNumber);
    account.deposit(amount);
    return { balance: account.verifyBalance() };
  }

  withdraw(accountNumber: string, amount: number): { balance: number } {
    const account = this.getAccount(accountNumber);
    account.withdraw(amount);
    return { balance: account.verifyBalance() };
  }

  transfer(
    accountNumber: string,
    destinationAccountNumber: string,
    amount: number,
  ): { balance: number } {
    const account = this.getAccount(accountNumber);
    const destinationAccount = this.getAccount(destinationAccountNumber);
    account.transfer(destinationAccount, amount);
    return { balance: account.verifyBalance() };
  }

  getBalance(accountNumber: string): { balance: number } {
    const account = this.getAccount(accountNumber);
    return { balance: account.verifyBalance() };
  }

  private getAccount(accountNumber: string): Account {
    const account = this.accounts[accountNumber];
    if (!account) {
      throw new HttpException(NOT_FOUND_ACCOUNT, HttpStatus.NOT_FOUND);
    }
    return account;
  }
}
