import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientAbstract } from './client.abstract.model';
import { Manager } from 'src/manager/manager.model';
import { AccountAbstract } from 'src/account/account.abstract.model';

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
    return this.clientService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedClient: ClientAbstract) {
    return this.clientService.update(id, updatedClient);
  }

  @Post('create')
  createClient(
    @Body('fullname') fullname: string,
    @Body('address') address: string,
    @Body('telphone') telphone: string,
    @Body('manager') manager: Manager,
    @Body('accounts') accounts: AccountAbstract[],
    @Body('salaryIncome') salaryIncome: number,
  ) {
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
