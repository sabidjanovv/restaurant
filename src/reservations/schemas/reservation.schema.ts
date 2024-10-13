import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Client } from '../../client/schemas/client.schema';
import { Tables } from '../../tables/schemas/table.schema';
import { Restourant } from '../../restourant/schemas/restourant.schema';
import { Status } from '../../status/schemas/status.schema';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ versionKey: false })
export class Reservation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client_id: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restourant' })
  restourant_id: Restourant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tables' })
  table_id: Tables;

  @Prop()
  reservation_time: Date;

  @Prop()
  number_of_guests: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' })
  status_id: Status;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
