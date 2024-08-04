import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/entities/accounts/account.model';
import { ACCOUNT_TYPE } from 'src/domain/enums/enums';

@Injectable()
export class SavingsAccount extends Account {
  interestRate: number;

  constructor(clientId: string, interestRate: number) {
    super(ACCOUNT_TYPE.SAVINGS, clientId);
    this.interestRate = interestRate;
  }

  calculateInterest(): void {
    const interest = this._balance * (this.interestRate / 100);
    this.deposit(interest);
  }
}
