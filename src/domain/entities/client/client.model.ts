import { v4 as uuidv4 } from 'uuid';
import { AccountAbstract } from '../accounts/account.abstract.model';
import { ClientAbstract } from './client.abstract.model';
import { ErrorMessages } from 'src/domain/enums/errors-messages';
import { ManagerAbstract } from 'src/domain/entities/manager/manager.abstract.model';

export class Client extends ClientAbstract {
  protected _id: string = uuidv4();

  constructor(
    protected _fullname: string,
    protected _address: string,
    protected _telphone: string,
    protected _manager: ManagerAbstract,
    protected _accounts: AccountAbstract[],
    protected _salaryIncome: number,
  ) {
    super();
  }

  openAccount(account: AccountAbstract): void {
    this._accounts.push(account);
  }

  alterAccountType(account: AccountAbstract, newType: string): void {
    const foundAccountIndex = this._accounts.findIndex(
      ({ clientId }) => clientId === account.clientId,
    );

    if (foundAccountIndex === -1) {
      throw new Error(ErrorMessages.NOT_FOUND_ACCOUNT);
    }

    account.accountType = newType;
  }

  closeAccount(account: AccountAbstract): void {
    this._accounts = this._accounts.filter(
      ({ accountNumber }) => accountNumber !== account.accountNumber,
    );
  }

  get id(): string {
    return this._id;
  }

  get fullname(): string {
    return this._fullname;
  }

  get address(): string {
    return this._address;
  }

  get telphone(): string {
    return this._telphone;
  }

  get salaryIncome(): number {
    return this._salaryIncome;
  }

  get manager(): ManagerAbstract {
    return this._manager;
  }

  get accounts(): AccountAbstract[] {
    return this._accounts;
  }

  set salaryIncome(salary: number) {
    this._salaryIncome = salary;
  }

  set accounts(account: AccountAbstract) {
    this._accounts.push(account);
  }

  set manager(manager: ManagerAbstract) {
    this._manager = manager;
  }

  set telphone(telphone: string) {
    this._telphone = telphone;
  }

  set address(address: string) {
    this._address = address;
  }

  set fullname(fullname: string) {
    this._fullname = fullname;
  }
}
