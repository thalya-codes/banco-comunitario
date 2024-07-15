import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from './client/client.model';
import { ManagerService } from './manager/manager.service';
import { ACCOUNT_TYPE } from './enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

const manager = new ManagerService();

const client = new Client(
  'Thalya Stéffany Coimbra Alonso',
  'Rua das Flores',
  '11 1111-1111',
  manager,
  [],
  600,
);

manager.addClient(client);
manager.openAccount(client, ACCOUNT_TYPE.TRANSACTION);
manager.openAccount(client, ACCOUNT_TYPE.SAVINGS);

console.log(client);

//TODO: Pesquisar sobre entity e model no nest.
//TODO: Criar endpoints
