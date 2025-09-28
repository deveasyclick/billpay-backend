import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InterSwitchModule } from 'src/integration/interswitch/interswitch.module';

@Module({
  imports: [InterSwitchModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
