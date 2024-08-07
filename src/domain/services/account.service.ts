import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages } from 'src/domain/enums/errors-messages';
import {
  AccountAbstract,
  TPaymentType,
} from 'src/domain/entities/accounts/account.abstract.model';
import { ACCOUNT_PAYMENT_TYPE, ACCOUNT_TYPE } from 'src/domain/enums/enums';
import { Payment } from 'src/domain/entities/payment/payment.model';
import { AccountFactory } from '../factory/account.factory';

@Injectable()
export class AccountsService {
  private accounts: { [key: string]: AccountAbstract } = {};

  createAccount(
    accountType: ACCOUNT_TYPE,
    clientId: string,
  ): { accountNumber: string } {
    const accountNumber = uuidv4().replace(/-/g, '').slice(0, 13);
    const newAccount = new AccountFactory().createAccount(
      accountType,
      clientId,
    );

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

  getAccount(accountNumber: string): AccountAbstract {
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
  ): void {
    const destinationAccount = this.getAccount(destinationAccountNumber);
    const originAccount = this.getAccount(originAccountNumber);

    switch (method) {
      case ACCOUNT_PAYMENT_TYPE.PIX:
        Payment.processPix(originAccount, destinationAccount, amount);
        break;
      case ACCOUNT_PAYMENT_TYPE.BANK_SLIP:
        Payment.processBankSplip(
          destinationAccount,
          originAccount,
          amount,
          dueate,
        );
        break;
    }
  }
}
