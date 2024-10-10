import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restourant } from '../../restourant/schemas/restourant.schema';

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ versionKey: false })
export class Manager {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  hashed_password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restourant',
  })
  restourant_id: Restourant;

  @Prop({defaultValue:false})
  is_active: boolean;

  @Prop()
  tg_link: string;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
