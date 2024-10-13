import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Reservation } from '../../reservations/schemas/reservation.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ versionKey: false })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' })
  reservation_id: Reservation;

  @Prop()
  amount: number;

  @Prop()
  payment_method: string;

  @Prop()
  payment_status: string;

  @Prop()
  transaction_id: string;

  @Prop()
  currency: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
