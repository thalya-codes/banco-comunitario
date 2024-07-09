import { Account } from 'src/account/account.model';

export abstract class Client {
  protected abstract _id: string;
  protected abstract _fullname: string;
  protected abstract _address: string;
  protected abstract _telphone: string;
  protected abstract _manager: any;
  protected abstract _accounts: Account[];

  abstract openAccount(account: Account): void;
  abstract closeAccount(account: Account): void;
  abstract alterAccountType(account: Account, newType: string): void;

  abstract get id(): string;
  abstract get fullname(): string;
  abstract get address(): string;
  abstract get telphone(): string;
  abstract get manager(): string;
  abstract get accounts(): Account[];

  abstract set fullname(fullname: string);
  abstract set address(address: string);
  abstract set telphone(telphone: string);
  abstract set manager(manager: any);
  abstract set accounts(account: Account);
}
