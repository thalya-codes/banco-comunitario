import { AccountAbstract } from 'src/domain/entities/accounts/account.abstract.model';
import { Client } from 'src/domain/entities/client/client.model';

export abstract class ManagerAbstract {
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
  abstract closeAccount(client: Client, account: AccountAbstract): void;
  abstract alterAccountType(
    client: Client,
    account: AccountAbstract,
    newType: string,
  ): void;
}
