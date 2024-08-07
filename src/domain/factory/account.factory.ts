import { AccountAbstract } from '../entities/accounts/account.abstract.model';
import { SavingsAccount } from '../entities/savings_account/savings_account.model';
import { TransactionAccount } from '../entities/transaction-account/transaction-account.model';
import { ACCOUNT_TYPE } from '../enums/enums';
import { IAccountFactory } from '../interfaces/account.interface';

export class AccountFactory implements IAccountFactory {
  createAccount(type: ACCOUNT_TYPE, clientId: string): AccountAbstract {
    switch (type) {
      case ACCOUNT_TYPE.SAVINGS: {
        return new SavingsAccount(clientId, 0);
      }

      case ACCOUNT_TYPE.CHECKING: {
        return new TransactionAccount(clientId);
      }
    }
  }
}
