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
import { ReviewsModule } from './reviews/reviews.module';
import { RolesModule } from './roles/roles.module';
import { FilesModule } from './files/files.module';
import { InventoryModule } from './inventory/inventory.module';
import { DetailsOrderModule } from './details-order/details-order.module';

@Module({
  imports: [AuthModule, CommonModule, OrdersModule, PaymentModule, ProductModule, SeedModule, PrismaModule, MembershipModule, PromotionModule, ReviewsModule, RolesModule, FilesModule, InventoryModule, DetailsOrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
