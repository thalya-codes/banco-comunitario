import { TransactionAccount } from 'src/domain/entities/transaction-account/transaction-account.model';
import { IAccountService } from 'src/domain/interfaces/account.interface';

export interface ITransactionAccountService extends IAccountService {
  createAccount(clientId: string): TransactionAccount;
}

export interface ITransactionAccountFactory {
  createAccount(clientId: string): TransactionAccount;
}
