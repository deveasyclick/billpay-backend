import { Body, Controller, Get, Post } from '@nestjs/common';
import { BillsService } from './bills.service';
import {
  BuyAirtimeDto,
  BuyAirtimeResponseDto,
  BuyDataDto,
  BuyDataResponseDto,
  GetDataPlansResponseDto,
} from './bills.validation';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from 'src/common/dto/response.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post('airtime/buy')
  @ApiOperation({ summary: 'Buy airtime' })
  @ApiBody({ type: BuyAirtimeDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiOkResponse({ type: BuyAirtimeResponseDto })
  private async buyAirtime(
    @Body()
    { customerId, networkProvider, requestReference, amount }: BuyAirtimeDto,
  ): Promise<BuyAirtimeResponseDto> {
    const data = await this.billsService.buyAirtime(
      customerId,
      amount,
      requestReference,
      networkProvider,
    );
    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }

  @Get('data/plans')
  @ApiOperation({ summary: 'Get data plans for all networks' })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiOkResponse({ type: GetDataPlansResponseDto })
  private async getDataPlans(): Promise<GetDataPlansResponseDto> {
    const data = await this.billsService.getDataPlans();
    return {
      statusCode: 200,
      data,
      message: 'Success',
    };
  }

  @Post('data/buy')
  @ApiOperation({ summary: 'Buy data plan' })
  @ApiBody({ type: BuyDataDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiOkResponse({ type: BuyDataResponseDto })
  private async buyData(
    @Body() { customerId, paymentCode, requestReference, amount }: BuyDataDto,
  ): Promise<BuyDataResponseDto> {
    const data = await this.billsService.buyData(
      customerId,
      paymentCode,
      requestReference,
      amount,
    );
    return {
      statusCode: 200,
      data,
      message: 'Success',
    };
  }
}
