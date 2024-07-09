export abstract class Account {
  protected _balance: number;
  protected _accountType: string;
  protected _clientId: string;
  protected _accountNumber: string;

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
  abstract verifyBalance(): number;
  abstract transfer(destination: Account, amount: number): void;
  abstract generateAccountNumber(): string;

  abstract set accountType(newType: string);
  abstract get accountType(): string;
  abstract get clientId(): string;
  abstract get accountNumber(): string;
  abstract set accountNumber(accountNumber: string);
}
