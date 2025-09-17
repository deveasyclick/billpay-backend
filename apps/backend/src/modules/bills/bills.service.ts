import { BadRequestException, Injectable } from '@nestjs/common';
import { InterSwitchService } from 'src/integration/interswitch/interswitch.service';
import type { NetworkProvider } from './bills.types';
import { validateAmount } from './utils/validateAmount';
import { airtimePaycodesMap, dataPaymentItemsMap } from './bills.constants';

@Injectable()
export class BillsService {
  constructor(private readonly interswitchService: InterSwitchService) {}

  public async buyAirtime(
    customerId: string,
    amountInNaira: number,
    requestReference: string,
    networkProvider: NetworkProvider,
  ) {
    const paymentCode = airtimePaycodesMap[networkProvider];
    const validateCustomerRes = await this.interswitchService.validateCustomer(
      customerId,
      paymentCode,
    );
    const amount = amountInNaira * 100; // Convert Naira to Kobo (1 Naira = 100 Kobo)
    const isValidAmount = validateAmount(
      amount,
      validateCustomerRes.Customers[0].Amount,
      validateCustomerRes.Customers[0].AmountType,
    );

    if (!isValidAmount) {
      console.log('customer validation failed', validateCustomerRes);
      throw new BadRequestException(
        validateCustomerRes.Customers[0].AmountTypeDescription,
      );
    }

    const pay = await this.interswitchService.pay({
      customerId,
      paymentCode,
      amount,
      requestReference,
    });

    const data = {
      amount: amountInNaira,
      networkProvider,
      requestReference,
      paymentCode,
      customerId,
    };
    // TODO: replace console with winston
    console.log('Airtime payment successful', {
      ...data,
      pay,
    });

    return data;
  }

  public async getDataPlans() {
    const paymentItems = await Promise.all([
      this.interswitchService.getBillerPaymentItems(dataPaymentItemsMap.mtn),
      this.interswitchService.getBillerPaymentItems(dataPaymentItemsMap.glo),
      this.interswitchService.getBillerPaymentItems(dataPaymentItemsMap.airtel),
    ]);

    // TODO: cache results
    return paymentItems.map((item) => item.PaymentItems).flat();
  }

  public async buyData(
    customerId: string,
    paymentCode: string,
    requestReference: string,
    amountInNaira: number,
  ) {
    const validateCustomerRes = await this.interswitchService.validateCustomer(
      customerId,
      paymentCode,
    );

    const amount = amountInNaira * 100; // Convert Naira to Kobo (1 Naira = 100 Kobo)
    const isValidAmount = validateAmount(
      amount,
      validateCustomerRes.Customers[0].Amount,
      validateCustomerRes.Customers[0].AmountType,
    );

    if (!isValidAmount) {
      console.log('customer validation failed', validateCustomerRes);
      throw new BadRequestException(
        validateCustomerRes.Customers[0].AmountTypeDescription,
      );
    }

    const pay = await this.interswitchService.pay({
      customerId,
      paymentCode,
      amount,
      requestReference,
    });

    const data = {
      paymentCode,
      amount,
      requestReference,
      customerId,
    };
    // TODO: replace console with winston
    console.log('payment for data successful', { ...data, pay });

    return data;
  }
}
