import { Module } from '@nestjs/common';
import { DetailsOrderService } from './details-order.service';
import { DetailsOrderController } from './details-order.controller';

@Module({
  controllers: [DetailsOrderController],
  providers: [DetailsOrderService],
})
export class DetailsOrderModule {}
