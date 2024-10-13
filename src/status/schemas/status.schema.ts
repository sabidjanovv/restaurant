import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatusDocument = HydratedDocument<Status>;

@Schema({ versionKey: false })
export class Status {
  @Prop()
  name: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
