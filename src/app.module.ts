import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, CommonModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
