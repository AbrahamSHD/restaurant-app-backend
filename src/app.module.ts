import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, CommonModule, OrdersModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
