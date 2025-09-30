import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BillsService } from './bills.service';
import { PayBillDTO, PayBillResponseDTO } from './dtos/payment';
import { GetBillerItemsResponseDto } from './dtos/item';
import {
  ValidateCustomerDTO,
  ValidateCustomerResponseDTO,
} from './dtos/validate-customer';

@Controller('bills')
@ApiTags('Bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post('pay')
  @ApiOperation({ summary: 'Pay any bill (airtime, data, TV, electricity)' })
  @ApiBody({ type: PayBillDTO })
  @ApiOkResponse({ type: PayBillResponseDTO })
  async payBill(@Body() dto: PayBillDTO): Promise<PayBillResponseDTO> {
    let data = {
      statusCode: 200,
      message: 'Success',
      data: {
        customerId: dto.customerId,
        amount: dto.amount,
        requestReference: dto.requestReference,
        paymentCode: dto.paymentCode,
        transactionRef: '',
      },
    };

    try {
      const res = await this.billsService.processBillPayment(dto);
      data.data.transactionRef = res.pay.TransactionRef;
    } catch (err) {
      console.log('err', err?.response?.data ?? err);
      throw new InternalServerErrorException('Payment failed');
    }

    return data;
  }

  @Get('items')
  @ApiOperation({ summary: 'Get all bill items' })
  @ApiOkResponse({ type: GetBillerItemsResponseDto })
  async getItems(): Promise<GetBillerItemsResponseDto> {
    return {
      statusCode: 200,
      message: 'Success',
      data: await this.billsService.fetchAllPlans(),
    };
  }

  @Post('validate-customer')
  @ApiOperation({ summary: 'Validate customer info' })
  @ApiBody({ type: ValidateCustomerDTO })
  @ApiOkResponse({ type: ValidateCustomerDTO })
  async validateCustomer(
    @Body() dto: ValidateCustomerDTO,
  ): Promise<ValidateCustomerResponseDTO> {
    try {
      const res = await this.billsService.validateCustomer(dto);
      return {
        statusCode: 200,
        message: 'Success',
        data: res,
      };
    } catch (err) {
      console.log('err', err?.response?.data ?? err);
      throw new InternalServerErrorException('Payment failed');
    }
  }
}
