import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tables } from '../../tables/schemas/table.schema';
import { Menu } from '../../menu/schemas/menu.schema';

export type LanguageDocument = HydratedDocument<Language>;

@Schema({ versionKey: false })
export class Language {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
      },
    ],
  })
  menus: Menu[];
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
