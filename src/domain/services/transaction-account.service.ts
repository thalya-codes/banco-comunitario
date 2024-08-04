import { v4 as uuidv4 } from 'uuid';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionAccount } from 'src/domain/entities/transaction-account/transaction-account.model';
import { TransactionAccountFactory } from 'src/domain/factory/transaction_account.factory';
import { ITransactionAccountService } from 'src/domain/interfaces/transaction_account.interface';
import { ErrorMessages } from 'src/domain/enums/errors-messages';

@Injectable()
export class TransactionAccountService implements ITransactionAccountService {
  private accounts: { [key: string]: TransactionAccount } = {};

  constructor(
    private readonly transactionAccountFactory: TransactionAccountFactory,
  ) {}

  createAccount(clientId: string): TransactionAccount {
    const accountNumber = uuidv4().replace(/-/g, '').slice(0, 13);
    const newAccount = this.transactionAccountFactory.createAccount(clientId);
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

  private getAccount(accountNumber: string): TransactionAccount {
    const account = this.accounts[accountNumber];
    if (!account) {
      throw new HttpException(
        ErrorMessages.NOT_FOUND_ACCOUNT,
        HttpStatus.NOT_FOUND,
      );
    }
    return account;
  }
}
