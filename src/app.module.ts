import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { SeedModule } from './seed/seed.module';
import { PrismaModule } from './prisma/prisma.module';
import { MembershipModule } from './membership/membership.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [AuthModule, CommonModule, OrdersModule, PaymentModule, ProductModule, SeedModule, PrismaModule, MembershipModule, PromotionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
