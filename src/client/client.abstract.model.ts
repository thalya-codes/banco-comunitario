import { Account } from 'src/account/account.model';
import { Manager } from 'src/manager/manager.model';

export abstract class ClientAbstract {
  protected abstract _id: string;
  protected abstract _fullname: string;
  protected abstract _address: string;
  protected abstract _telphone: string;
  protected abstract _manager: Manager;
  protected abstract _accounts: Account[];
  protected abstract _salaryIncome: number;

  abstract openAccount(account: Account): void;
  abstract closeAccount(account: Account): void;
  abstract alterAccountType(account: Account, newType: string): void;

  abstract get id(): string;
  abstract get fullname(): string;
  abstract get address(): string;
  abstract get telphone(): string;
  abstract get manager(): Manager;
  abstract get accounts(): Account[];
  abstract get salaryIncome(): number;

  abstract set fullname(fullname: string);
  abstract set address(address: string);
  abstract set telphone(telphone: string);
  abstract set manager(manager: Manager);
  abstract set accounts(account: Account);
  abstract set salaryIncome(salary: number);
}
