import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { CreateOrder } from './use-cases/create-order.use-case';
import { ListOrders } from './use-cases/list-orders.use-case';
import { FinishOrder } from './use-cases/finish-order.use-case';
import { GetOrder } from './use-cases/get-order.use-case';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrderRepository, CreateOrder, ListOrders, FinishOrder, GetOrder],
})
export class OrdersModule {}
