import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SavingsAccount } from './savings_account.model';
import { v4 as uuidv4 } from 'uuid';

interface ISavingsAccountService {
  createAccount(clientId: string, interestRate: number): SavingsAccount;
  deposit(accountNumber: string, amount: number): { balance: number };
}
@Injectable()
export class SavingsAccountService implements ISavingsAccountService {
  private accounts: { [key: string]: SavingsAccount } = {};

  createAccount(clientId: string, interestRate: number): SavingsAccount {
    const accountNumber = uuidv4().replace(/-/g, '').slice(0, 13);
    const newAccount = new SavingsAccount(clientId);
    newAccount.accountNumber = accountNumber;
    newAccount.interestRate = interestRate;
    this.accounts[accountNumber] = newAccount;
    return newAccount;
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

  calculateInterest(accountNumber: string): void {
    const account = this.getAccount(accountNumber);
    account.calculateInterest();
  }

  private getAccount(accountNumber: string): SavingsAccount {
    const account = this.accounts[accountNumber];
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    return account;
  }
}
