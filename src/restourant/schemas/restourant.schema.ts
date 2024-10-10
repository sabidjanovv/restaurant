import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tables } from '../../tables/schemas/table.schema';
import { Menu } from '../../menu/schemas/menu.schema';
import { Manager } from '../../managers/schemas/manager.schema';

export type RestourantDocument = HydratedDocument<Restourant>;

@Schema({ versionKey: false })
export class Restourant {
  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tables',
      },
    ],
  })
  tables: Tables[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
      },
    ],
  })
  managers: Manager[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
      },
    ],
  })
  menu: Menu[];
}

export const RestourantSchema = SchemaFactory.createForClass(Restourant);
