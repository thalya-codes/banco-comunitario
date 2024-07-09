import { Account } from 'src/account/account.model';
import { Client } from 'src/client/client.model';

export abstract class Manager {
  protected _id: string;
  protected _fullname: string;
  protected _clients: Client[];

  protected abstract verifyIfClientExists(
    client: Client,
    message: string,
  ): void;
  abstract addClient(client: Client): void;
  abstract removeClient(client: Client): void;
  abstract openAccount(client: Client, accountType: string): void;
  abstract closeAccount(client: Client, account: Account): void;
  abstract alterAccountType(
    client: Client,
    account: Account,
    newType: string,
  ): void;
}
