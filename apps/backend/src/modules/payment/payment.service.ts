import { BadRequestException, Injectable } from '@nestjs/common';
import type { PayObject } from 'src/common/types/payment';
import { InterSwitchService } from 'src/integration/interswitch/interswitch.service';
import { ProviderResult } from '../bills/bills.types';
import type { PayResponse } from 'src/integration/interswitch/types';

@Injectable()
export class PaymentService {
  constructor(private readonly interswitchService: InterSwitchService) {}
  async pay(
    data: PayObject,
  ): Promise<{ status: ProviderResult; pay: PayResponse }> {
    const payResp = await this.interswitchService.pay({
      customerId: data.customerId,
      paymentCode: data.paymentCode,
      amount: data.amount,
      requestReference: data.requestReference,
    });

    // Step 8: normalize response
    const providerResult = this.mapProviderResult(payResp);

    switch (providerResult) {
      case ProviderResult.SUCCESS:
        return { status: ProviderResult.SUCCESS, pay: payResp };

      case ProviderResult.PENDING:
        return { status: ProviderResult.PENDING, pay: payResp };

      case ProviderResult.FAILED:
        throw new BadRequestException({
          message: 'Bill payment failed. Contact support for reconciliation.',
          details: payResp,
        });

      default:
        throw new BadRequestException({
          meessage: 'Unknown provider result',
          details: payResp,
        });
    }
  }

  private mapProviderResult(resp: any): ProviderResult {
    if (
      resp.ResponseCode === '90000' ||
      resp.ResponseCodeGrouping === 'SUCCESSFUL'
    ) {
      return ProviderResult.SUCCESS;
    }
    if (
      resp.ResponseCode === '90009' ||
      resp.ResponseCodeGrouping === 'PENDING'
    ) {
      return ProviderResult.PENDING;
    }
    return ProviderResult.FAILED;
  }
}
