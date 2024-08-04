import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientAbstract } from 'src/domain/entities/client/client.abstract.model';
import { ClientFactory } from 'src/domain/factory/client.factory';
import { ErrorMessages } from 'src/domain/enums/errors-messages';
import { ManagerAbstract } from 'src/domain/entities/manager/manager.abstract.model';
import { AccountAbstract } from 'src/domain/entities/accounts/account.abstract.model';

@Injectable()
export class ClientService {
  private clients: ClientAbstract[] = [];

  constructor(private readonly clientFactory: ClientFactory) {}

  findAll(): ClientAbstract[] {
    return this.clients;
  }

  findById(id: string): ClientAbstract {
    const client = this.clients.find((client) => client.id === id);
    if (!client) throw new NotFoundException(ErrorMessages.NOT_EXISTENT_CLIENT);
    return client;
  }

  delete(id: string) {
    const clientIndex = this.clients.findIndex((client) => client.id === id);
    if (clientIndex === -1)
      throw new NotFoundException(ErrorMessages.NOT_EXISTENT_CLIENT);
    this.clients.splice(clientIndex, 1);
  }

  update(id: string, updatedClient: ClientAbstract) {
    const clientIndex = this.clients.findIndex((client) => client.id === id);
    if (clientIndex === -1) this.clients[clientIndex] = updatedClient;
  }

  createClient(
    fullname: string,
    address: string,
    telphone: string,
    manager: ManagerAbstract,
    accounts: AccountAbstract[],
    salaryIncome: number,
  ): ClientAbstract {
    const client = this.clientFactory.createClient(
      fullname,
      address,
      telphone,
      manager,
      accounts,
      salaryIncome,
    );
    this.clients.push(client);
    return client;
  }
}
