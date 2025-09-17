import { IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';
import { NetworkProvider } from './bills.types';
import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dto/response.dto';

class BaseDto {
  @ApiProperty({
    description: 'Payment code for data plan',
    example: 'phone number, meter no, decoder no, etc',
  })
  @IsNotEmpty()
  customerId: string; // phone number, meter no, decoder no, etc

  @ApiProperty({
    description: 'Amount',
    example: '50',
  })
  @IsNotEmpty()
  @Min(50)
  amount: number;

  @ApiProperty({
    description: 'Unique request reference for this transaction',
    example: '81nzn1277',
  })
  @IsNotEmpty()
  @IsString()
  requestReference: string;
}

export class BuyAirtimeDto extends BaseDto {
  @ApiProperty({
    description: 'Network provider',
    enum: NetworkProvider,
  })
  @IsNotEmpty()
  @IsEnum(NetworkProvider)
  networkProvider: NetworkProvider;
}

export class BuyDataDto extends BaseDto {
  @ApiProperty({
    description: 'Payment code for data plan',
    example: '4444',
  })
  @IsNotEmpty()
  paymentCode: string;
}

// Response
class BaseResponse {
  @ApiProperty()
  customerId: string; // phone number, meter no, decoder no, etc

  @ApiProperty()
  amount: number;

  @ApiProperty()
  requestReference: string;
}

export class BuyDataResponse extends BaseResponse {
  @ApiProperty()
  paymentCode: string;
}
export class BuyDataResponseDto extends ApiResponseDto<BuyDataResponse> {}

export class BuyAirtimeResponse extends BaseResponse {
  @ApiProperty()
  networkProvider: NetworkProvider;
}

export class BuyAirtimeResponseDto extends ApiResponseDto<BuyAirtimeResponse> {}

class GetDataPlans {
  @ApiProperty({
    example: '1GB (valid for 1 month) #1,500',
  })
  Name: string;

  @ApiProperty({
    example: 'MTN Data Bundles',
  })
  BillerName: string;

  @ApiProperty({
    example: 'Meter No',
  })
  ConsumerIdField: string;

  @ApiProperty({
    example: '4444',
  })
  PaymentCode: string; // payment code
}

export class GetDataPlansResponseDto extends ApiResponseDto<GetDataPlans[]> {}
