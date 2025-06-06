import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderItem } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { OrderStatus } from '../enums/order.status';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: { userId: string; date: Date }): Promise<Order> {
    const createdOrder = new this.orderModel({
      userId: data.userId,
      date: data.date,
      status: OrderStatus.Pendent,
    });

    return createdOrder.save();
  }

  findAllByUserId(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({
        userId: userId,
      })
      .sort({
        status: -1,
        date: -1,
      })
      .exec();
  }

  findAllByStatus(userId: string, statusOrder: OrderStatus): Promise<Order[]> {
    return this.orderModel
      .find({
        userId: userId,
        status: statusOrder,
      })
      .exec();
  }

  async findByIdFromUser(id: string, userId: string): Promise<Order | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return await this.orderModel
      .findOne({
        _id: id,
        userId: userId,
      })
      .exec();
  }

  async findById(id: string, userId: string): Promise<Order | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return await this.orderModel
      .findOne({
        _id: id,
        userId: userId,
      })
      .exec();
  }

  async update(order: Order): Promise<void> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(order._id, {
      $set: {
        status: order.status,
        finishDate: order.finishDate,
      },
    });
    if (!updatedOrder) {
      throw new Error('Error on update');
    }
  }

  async updateItems(order: Order): Promise<void> {
    const total = Object.keys(order.items).reduce(
      (previous: number, index: string) => {
        const orderItem = order.items[index] as OrderItem;

        return previous + orderItem.total;
      },
      0,
    );

    const updatedOrder = await this.orderModel.findByIdAndUpdate(order._id, {
      $set: {
        items: order.items,
        total: total,
      },
    });
    if (!updatedOrder) {
      throw new Error('Error on update');
    }
  }
}
