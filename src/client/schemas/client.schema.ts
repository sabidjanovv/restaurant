import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restourant } from '../../restourant/schemas/restourant.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false })
export class Client {
  @Prop()
  name: string;

  @Prop()
  tg_link: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  hashed_password: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  is_owner: boolean;

  @Prop({ default: false })
  is_active: boolean;

  @Prop()
  activate_link: string; // string type for UUID link

  @Prop()
  hashed_refresh_token: string; // added this property for hashed refresh token
}

export const ClientSchema = SchemaFactory.createForClass(Client);
