import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { ACCOUNT_TYPE } from 'src/enums';

@Injectable()
export class SavingsAccountService extends AccountService {
  private interestRate: number;

  constructor(clientId: string) {
    super(ACCOUNT_TYPE.SAVINGS, clientId);
  }

  //TODO: Implementar método
  calculateInterest(): void {}
}
