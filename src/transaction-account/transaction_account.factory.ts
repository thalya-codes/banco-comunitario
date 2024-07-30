import { Injectable } from '@nestjs/common';
import { TransactionAccount } from './transaction-account.model';
import { ITransactionAccountFactory } from './transaction_account.interface';

@Injectable()
export class TransactionAccountFactory implements ITransactionAccountFactory {
  createAccount(clientId: string): TransactionAccount {
    return new TransactionAccount(clientId);
  }
}
