import { ACCOUNT_PAYMENT_TYPE } from 'src/enums';

export type TPaymentType =
  | ACCOUNT_PAYMENT_TYPE.BANK_SLIP
  | ACCOUNT_PAYMENT_TYPE.PIX;

export abstract class AccountAbstract {
  protected _balance: number;
  protected _accountType: string;
  protected _clientId: string;
  protected _accountNumber: string;

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
  abstract verifyBalance(): number;
  abstract transfer(destination: AccountAbstract, amount: number): void;
  abstract generateAccountNumber(): string;
  abstract payBill(
    amount: number,
    destinationAccount: AccountAbstract,
    method: TPaymentType,
    dueate?: string,
  ): void;

  abstract set accountType(newType: string);
  abstract get accountType(): string;
  abstract get clientId(): string;
  abstract get accountNumber(): string;
  abstract set accountNumber(accountNumber: string);
}
