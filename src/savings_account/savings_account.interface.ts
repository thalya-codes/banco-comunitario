import { SavingsAccount } from './savings_account.model';

export interface ISavingsAccountService {
  createAccount(clientId: string, interestRate: number): SavingsAccount;
  deposit(accountNumber: string, amount: number): { balance: number };
  withdraw(accountNumber: string, amount: number): { balance: number };
  transfer(
    accountNumber: string,
    destinationAccountNumber: string,
    amount: number,
  ): { balance: number };
  getBalance(accountNumber: string): { balance: number };
  calculateInterest(accountNumber: string): void;
}

export interface ISavingsAccountFactory {
  createAccount(clientId: string, interestRate: number): SavingsAccount;
}
