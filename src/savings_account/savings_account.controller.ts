import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SavingsAccountService } from './savings_account.service';
import { SavingsAccount } from './savings_account.model';

@Controller('savings-accounts')
export class SavingsAccountsController {
  constructor(private readonly savingsAccountsService: SavingsAccountService) {}

  @Post('create')
  createAccount(
    @Body('clientId') clientId: string,
    @Body('interestRate') interestRate: number,
  ): SavingsAccount {
    return this.savingsAccountsService.createAccount(clientId, interestRate);
  }

  @Post(':accountNumber/deposit')
  deposit(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.savingsAccountsService.deposit(accountNumber, amount);
  }

  @Post(':accountNumber/withdraw')
  withdraw(
    @Param('accountNumber') accountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.savingsAccountsService.withdraw(accountNumber, amount);
  }

  @Post(':accountNumber/transfer')
  transfer(
    @Param('accountNumber') accountNumber: string,
    @Body('destinationAccountNumber') destinationAccountNumber: string,
    @Body('amount') amount: number,
  ): { balance: number } {
    return this.savingsAccountsService.transfer(
      accountNumber,
      destinationAccountNumber,
      amount,
    );
  }

  @Get(':accountNumber/balance')
  getBalance(@Param('accountNumber') accountNumber: string): {
    balance: number;
  } {
    return this.savingsAccountsService.getBalance(accountNumber);
  }

  @Post(':accountNumber/calculate-interest')
  calculateInterest(@Param('accountNumber') accountNumber: string): void {
    this.savingsAccountsService.calculateInterest(accountNumber);
  }
}
