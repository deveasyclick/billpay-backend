import { Module } from '@nestjs/common';
import { InterSwitchService } from './interswitch.service';

@Module({
  imports: [],
  providers: [InterSwitchService],
  exports: [InterSwitchService],
})
export class InterSwitchModule {}
