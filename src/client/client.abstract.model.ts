import { AccountAbstract } from 'src/account/account.abstract.model';
import { ManagerAbstract } from 'src/manager/manager.abstract.model';

export abstract class ClientAbstract {
  protected abstract _id: string;
  protected abstract _fullname: string;
  protected abstract _address: string;
  protected abstract _telphone: string;
  protected abstract _manager: ManagerAbstract;
  protected abstract _accounts: AccountAbstract[];
  protected abstract _salaryIncome: number;

  abstract openAccount(account: AccountAbstract): void;
  abstract closeAccount(account: AccountAbstract): void;
  abstract alterAccountType(account: AccountAbstract, newType: string): void;

  abstract get id(): string;
  abstract get fullname(): string;
  abstract get address(): string;
  abstract get telphone(): string;
  abstract get manager(): ManagerAbstract;
  abstract get accounts(): AccountAbstract[];
  abstract get salaryIncome(): number;

  abstract set fullname(fullname: string);
  abstract set address(address: string);
  abstract set telphone(telphone: string);
  abstract set manager(manager: ManagerAbstract);
  abstract set accounts(account: AccountAbstract);
  abstract set salaryIncome(salary: number);
}
