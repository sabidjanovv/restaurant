import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restourant } from '../../restourant/schemas/restourant.schema';

export type TablesDocument = HydratedDocument<Tables>;

@Schema({ versionKey: false })
export class Tables {
  @Prop()
  number: string;

  @Prop()
  amount: string;

  @Prop()
  qr_code: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restourant",
  })
  restourant_id: Restourant;
}

export const TablesSchema = SchemaFactory.createForClass(Tables);
