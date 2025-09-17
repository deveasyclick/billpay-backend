import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BillsModule } from './modules/bills/bills.module';
import configuration from './config/configuration';
import { validateConfig } from './config/config.validation';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateConfig,
    }),
    CacheModule.register({ isGlobal: true }),
    BillsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
