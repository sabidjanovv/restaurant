import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const newPayment = new this.paymentModel(createPaymentDto);
    return newPayment.save();
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().populate('reservation_id').exec();
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).populate('reservation_id').exec();
  }

  async update(
    id: string,
    updatePaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return this.paymentModel
      .findByIdAndUpdate(id, updatePaymentDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Payment> {
    return this.paymentModel.findByIdAndDelete(id).exec();
  }
}
