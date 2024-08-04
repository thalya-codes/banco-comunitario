import { Injectable } from '@nestjs/common';
import { SavingsAccount } from '../entities/savings_account/savings_account.model';
import { ISavingsAccountFactory } from 'src/domain/interfaces/savings_account.interface';

@Injectable()
export class SavingsAccountFactory implements ISavingsAccountFactory {
  createAccount(clientId: string, interestRate: number): SavingsAccount {
    const newAccount = new SavingsAccount(clientId, interestRate);
    return newAccount;
  }
}
