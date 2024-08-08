import { v4 as uuidv4 } from 'uuid';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SavingsAccount } from 'src/domain/entities/savings_account/savings_account.model';
import { SavingsAccountFactory } from 'src/domain/factory/savings_account.factory';
import { ISavingsAccountService } from 'src/domain/interfaces/savings_account.interface';
import { ErrorMessages } from 'src/domain/enums/errors-messages';
import { TPaymentType } from 'src/domain/entities/accounts/account.abstract.model';

@Injectable()
export class SavingsAccountService implements ISavingsAccountService {
  private accounts: { [key: string]: SavingsAccount } = {};

  constructor(private readonly savingsAccountFactory: SavingsAccountFactory) {}

  //Tem necessidade de ter cobrança de juros na criação?
  createAccount(clientId: string, interestRate: number): SavingsAccount {
    const accountNumber = uuidv4().replace(/-/g, '').slice(0, 13);
    const newAccount = this.savingsAccountFactory.createAccount(
      clientId,
      interestRate,
    );
    newAccount.accountNumber = accountNumber;
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

  getAccount(accountNumber: string): SavingsAccount {
    const account = this.accounts[accountNumber];
    if (!account) {
      throw new HttpException(
        ErrorMessages.NOT_FOUND_ACCOUNT,
        HttpStatus.NOT_FOUND,
      );
    }
    return account;
  }

  payBill(
    amount: number,
    originAccountNumber: string,
    destinationAccountNumber: string,
    method: TPaymentType,
    dueate?: string,
  ): void {}
}
