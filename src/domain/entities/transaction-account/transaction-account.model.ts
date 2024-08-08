import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/entities/accounts/account.model';
import { ErrorMessages } from 'src/domain/enums/errors-messages';
import { ACCOUNT_TYPE } from 'src/domain/enums/enums';

@Injectable()
export class TransactionAccount extends Account {
  private _overdraft: number = 100;

  constructor(clientId: string) {
    super(ACCOUNT_TYPE.SAVINGS, clientId);
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      const balanceWithOverdraft = this._balance + this._overdraft;

      if (amount > balanceWithOverdraft) {
        throw new Error(ErrorMessages.INSUFICIENT_BALANCE);
      }

      this._overdraft = balanceWithOverdraft - amount;

      this._balance = balanceWithOverdraft - amount;
      return;
    }

    this._balance -= amount;
  }
}
