import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { CreateOrder } from './use-cases/create-order.use-case';
import { ListOrders } from './use-cases/list-orders.use-case';
import { FinishOrder } from './use-cases/finish-order.use-case';
import { GetOrder } from './use-cases/get-order.use-case';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemsController } from './order-items.controller';
import { AddItemOrder } from './use-cases/items/add-item-order.use-case';
import { ProductsModule } from '../products/products.module';
import { RemoveItemOrder } from './use-cases/items/remove-item-order.use-case';
import { OrderItemsService } from './order-items.service';
import { OrdersService } from './orders.service';
import { ValidateStockItemsOrder } from './use-cases/validate-stock-items-order.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,
  ],
  controllers: [OrdersController, OrderItemsController],
  providers: [
    OrderRepository,
    CreateOrder,
    ListOrders,
    FinishOrder,
    GetOrder,
    ValidateStockItemsOrder,
    OrdersService,
    AddItemOrder,
    RemoveItemOrder,
    OrderItemsService,
  ],
})
export class OrdersModule {}
