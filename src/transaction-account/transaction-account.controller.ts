import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionAccountService } from './transaction-account.service';

@Controller('transaction-account')
export class TransationAccountsController {
  constructor(
    private readonly transationAccountsService: TransactionAccountService,
  ) {}

  @Post('create')
  createAccount(@Body('clientId') clientId: string): { accountNumber: string } {
    const account = this.transationAccountsService.createAccount(clientId);
    return { accountNumber: account.accountNumber };
  }

  @Post(':accountNumber/deposit')
  deposit(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.transationAccountsService.deposit(accountNumber, amount);
  }

  @Post(':accountNumber/withdraw')
  withdraw(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.transationAccountsService.withdraw(accountNumber, amount);
  }

  @Post(':accountNumber/transfer')
  transfer(
    @Param('accountNumber') accountNumber: string,
    @Body('destinationAccountNumber') destinationAccountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.transationAccountsService.transfer(
      accountNumber,
      destinationAccountNumber,
      amount,
    );
  }

  @Get(':accountNumber/balance')
  getBalance(@Param('accountNumber') accountNumber: string): {
    balance: number;
  } {
    return this.transationAccountsService.getBalance(accountNumber);
  }
}
