import { AccountAbstract } from '../entities/accounts/account.abstract.model';
import { ACCOUNT_TYPE } from '../enums/enums';

export interface IAccountService {
  createAccount(clientId: string): AccountAbstract;
  deposit(accountNumber: string, amount: number): { balance: number };
  withdraw(accountNumber: string, amount: number): { balance: number };
  transfer(
    accountNumber: string,
    destinationAccountNumber: string,
    amount: number,
  ): { balance: number };
  getBalance(accountNumber: string): { balance: number };
}

export interface IAccountFactory {
  createAccount(type: ACCOUNT_TYPE, clientId: string): AccountAbstract;
}
