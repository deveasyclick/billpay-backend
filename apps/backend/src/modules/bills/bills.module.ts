import { Module } from '@nestjs/common';
import { InterSwitchModule } from 'src/integration/interswitch/interswitch.module';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';

@Module({
  imports: [InterSwitchModule],
  providers: [BillsService],
  controllers: [BillsController],
  exports: [BillsService],
})
export class BillsModule {}
