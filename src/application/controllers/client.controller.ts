import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClientService } from 'src/domain/services/client.service';
import { ClientAbstract } from 'src/domain/entities/client/client.abstract.model';
import { ManagerAbstract } from 'src/domain/entities/manager/manager.abstract.model';
import { Account } from 'src/domain/entities/accounts/account.model';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): ClientAbstract[] {
    return this.clientService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): ClientAbstract {
    return this.clientService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.clientService.delete(id);
    return { message: 'Client deleted successfully' };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedClient: ClientAbstract) {
    this.clientService.update(id, updatedClient);
    return { message: 'Client updated successfully' };
  }

  @Post()
  createClient(
    @Body('fullname') fullname: string,
    @Body('address') address: string,
    @Body('telphone') telphone: string,
    @Body('manager') manager: ManagerAbstract,
    @Body('accounts') accounts: Account[],
    @Body('salaryIncome') salaryIncome: number,
  ): ClientAbstract {
    return this.clientService.createClient(
      fullname,
      address,
      telphone,
      manager,
      accounts,
      salaryIncome,
    );
  }
}
