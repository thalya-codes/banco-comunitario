import { Injectable } from '@nestjs/common';
import { AccountAbstract } from 'src/domain/entities/accounts/account.abstract.model';
import { ErrorMessages } from 'src/domain/enums/errors-messages';

@Injectable()
export class Payment {
  //realizado em qualquer momento e imediatamente
  static processPix(
    origin: AccountAbstract,
    destination: AccountAbstract,
    amount: number,
  ) {
    origin.transfer(destination, amount);
  }

  //tem data de vencimento
  //se a pessaa pagar dps do vencimento adicionar um juros ao valor
  //foi realizado no final de semana
  static processBankSplip(
    destination: AccountAbstract,
    origin: AccountAbstract,
    amount: number,
    dueDate: string,
  ) {
    const today_date = new Date();
    const due_date = new Date(dueDate);
    const week_day = today_date.getDay();
    const isWeekend = week_day === 5 || week_day === 6;
    const due_day = parseInt(due_date.toLocaleString().split('/')[0]);
    const today_day = parseInt(today_date.toLocaleString().split('/')[0]);
    let final_amount = amount;

    if (today_day > due_day) {
      const continuos_day = today_day - due_day;
      const interest_rate_per_day = 0.5 / 100;

      final_amount =
        amount * Math.pow(1 + interest_rate_per_day, continuos_day);
    }

    if (isWeekend) {
      console.log(ErrorMessages.PAYMENT_SCHEDULED);
      return;
    }

    origin.transfer(destination, final_amount);
  }
}
