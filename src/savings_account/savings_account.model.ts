import { Injectable } from '@nestjs/common';
import { Account } from 'src/account/account.model';
import { ACCOUNT_TYPE } from 'src/enums';

@Injectable()
export class SavingsAccount extends Account {
  interestRate: number;

  constructor(clientId: string) {
    super(ACCOUNT_TYPE.SAVINGS, clientId);
  }

  //TODO: Implementar método
  calculateInterest(): void {}
}
