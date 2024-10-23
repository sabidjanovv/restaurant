import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Menu } from '../../menu/schemas/menu.schema';
import { Language } from '../../language/schemas/language.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ versionKey: false })
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
      },
    ],
  })
  languages: Language[];

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

export const CategorySchema = SchemaFactory.createForClass(Category);
