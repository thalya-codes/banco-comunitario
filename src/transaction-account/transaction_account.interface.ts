import { TransactionAccount } from './transaction-account.model';
import { IAccountService } from 'src/account/account.interface';

export interface ITransactionAccountService extends IAccountService {
  createAccount(clientId: string): TransactionAccount;
}

export interface ITransactionAccountFactory {
  createAccount(clientId: string): TransactionAccount;
}
