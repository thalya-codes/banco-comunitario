import { Injectable } from '@nestjs/common';
import { Client } from './client.model';
import { ManagerAbstract } from 'src/manager/manager.abstract.model';
import { AccountAbstract } from 'src/account/account.abstract.model';

@Injectable()
export class ClientFactory {
  createClient(
    fullname: string,
    address: string,
    telphone: string,
    manager: ManagerAbstract,
    accounts: AccountAbstract[],
    salaryIncome: number,
  ): Client {
    return new Client(
      fullname,
      address,
      telphone,
      manager,
      accounts,
      salaryIncome,
    );
  }
}
