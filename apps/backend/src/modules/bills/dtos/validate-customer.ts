import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';
import { ApiResponseDto } from 'src/common/dto/response.dto';

export class ValidateCustomerDTO {
  @ApiProperty({
    description:
      'Unique customer identifier (e.g. phone number, meter number, decoder number, etc.)',
    example: '08012345678',
  })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    description:
      'Payment code for the specific biller product (e.g. MTN Airtime 100, DSTV Compact, Ikeja Prepaid)',
    example: '4444',
  })
  @IsNotEmpty()
  @IsString()
  paymentCode: string;
}

class ValidateCustomerResponse {
  @ApiProperty()
  BillerId: number;

  @ApiProperty()
  PaymentCode: string;

  @ApiProperty()
  CustomerId: string;

  @ApiProperty()
  ResponseCode: string;

  @ApiProperty()
  FullName: string;

  @ApiProperty()
  Amount: number;

  @ApiProperty()
  AmountType: number;

  @ApiProperty()
  'AmountTypeDescription': string;

  @ApiProperty()
  Surcharge: number;
}

export class ValidateCustomerResponseDTO extends ApiResponseDto<ValidateCustomerResponse> {}
