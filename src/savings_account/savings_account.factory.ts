import { Injectable } from '@nestjs/common';
import { SavingsAccount } from './savings_account.model';
import { ISavingsAccountFactory } from './savings_account.interface';

@Injectable()
export class SavingsAccountFactory implements ISavingsAccountFactory {
  createAccount(clientId: string, interestRate: number): SavingsAccount {
    const newAccount = new SavingsAccount(clientId, interestRate);
    return newAccount;
  }
}
