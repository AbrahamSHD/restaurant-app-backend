import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { SeedModule } from './seed/seed.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, CommonModule, OrdersModule, PaymentModule, ProductModule, SeedModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
