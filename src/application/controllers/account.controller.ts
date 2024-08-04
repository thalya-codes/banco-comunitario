import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountsService } from 'src/domain/services/account.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('create')
  createAccount(
    @Body('accountType') accountType: string,
    @Body('clientId') clientId: string,
  ): { accountNumber: string } {
    return this.accountsService.createAccount(accountType, clientId);
  }

  @Post(':accountNumber/deposit')
  deposit(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.accountsService.deposit(accountNumber, amount);
  }

  @Post(':accountNumber/withdraw')
  withdraw(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.accountsService.withdraw(accountNumber, amount);
  }

  @Post(':accountNumber/transfer')
  transfer(
    @Param('accountNumber') accountNumber: string,
    @Body('destinationAccountNumber') destinationAccountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.accountsService.transfer(
      accountNumber,
      destinationAccountNumber,
      amount,
    );
  }

  @Get(':accountNumber/balance')
  getBalance(@Param('accountNumber') accountNumber: string): {
    balance: number;
  } {
    return this.accountsService.getBalance(accountNumber);
  }
}
