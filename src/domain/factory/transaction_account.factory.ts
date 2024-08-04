import { Injectable } from '@nestjs/common';
import { TransactionAccount } from 'src/domain/entities/transaction-account/transaction-account.model';
import { ITransactionAccountFactory } from 'src/domain/interfaces/transaction_account.interface';

@Injectable()
export class TransactionAccountFactory implements ITransactionAccountFactory {
  createAccount(clientId: string): TransactionAccount {
    return new TransactionAccount(clientId);
  }
}
