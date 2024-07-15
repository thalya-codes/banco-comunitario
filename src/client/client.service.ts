import { Injectable } from '@nestjs/common';
import { ClientAbstract } from './client.abstract.model';
import { NOT_EXISTENT_CLIENT } from 'src/constants';
import { Client } from './client.model';
import { Manager } from 'src/manager/manager.model';
import { AccountAbstract } from 'src/account/account.abstract.model';

@Injectable()
export class ClientService {
  clients: ClientAbstract[];

  findAll(): ClientAbstract[] {
    return this.clients;
  }

  findById(id: string): ClientAbstract {
    const client = this.clients.find((client) => client.id === id);

    if (!client) throw new Error(NOT_EXISTENT_CLIENT);

    return client;
  }

  delete(id: string) {
    const client = this.clients.find((client) => client.id === id);

    if (!client) throw new Error(NOT_EXISTENT_CLIENT);
    this.clients = this.clients.filter((client) => client.id !== id);
  }

  update(id: string, updatedClient: ClientAbstract) {
    const clientIndex = this.clients.findIndex((client) => client.id === id);

    if (clientIndex === -1) throw new Error(NOT_EXISTENT_CLIENT);

    this.clients.splice(clientIndex, 0, updatedClient);
  }

  createClient(
    fullname: string,
    address: string,
    telphone: string,
    manager: Manager,
    accounts: AccountAbstract[],
    salaryIncome: number,
  ) {
    const client = new Client(
      fullname,
      address,
      telphone,
      manager,
      accounts,
      salaryIncome,
    );

    return client;
  }
}

// Com o que você me mandou eu entendi que:
// Model > define o formato e/ou os métodos e atrbibutos relacionados aquele universo
// Service -> define métodos de manipulação de um modelo
// Controller -> intecepta a request e executa uma lógica do service

// OBS: me corriga se eu tiver entendido errado
