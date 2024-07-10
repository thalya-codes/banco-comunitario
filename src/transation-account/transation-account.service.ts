import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { INSUFICIENT_BALANCE } from 'src/constants';
import { ACCOUNT_TYPE } from 'src/enums';

@Injectable()
export class TransationAccountService extends AccountService {
  private _overdraft: number = 100;

  constructor(clientId: string) {
    super(ACCOUNT_TYPE.TRANSACTION, clientId);
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      const balanceWithOverdraft = this._balance + this._overdraft;

      if (amount > balanceWithOverdraft) {
        throw new Error(INSUFICIENT_BALANCE);
      }

      this._overdraft = balanceWithOverdraft - amount;

      this._balance = balanceWithOverdraft - amount;
      return;
    }

    this._balance -= amount;
  }
}
