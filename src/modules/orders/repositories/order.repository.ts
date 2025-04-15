import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderStatus } from '../enums/order.status';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: {
    clientName: string;
    status: OrderStatus;
  }): Promise<Order> {
    const createdOrder = new this.orderModel(data);

    return createdOrder.save();
  }

  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
    });
    if (!updatedOrder) {
      throw new Error('Error on update');
    }
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  findById(id: string): Promise<Order | null> {
    return this.orderModel
      .findOne({
        _id: id,
      })
      .exec();
  }
}
