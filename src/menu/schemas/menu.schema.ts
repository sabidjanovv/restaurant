import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tables } from '../../tables/schemas/table.schema';
import { Restourant } from '../../restourant/schemas/restourant.schema';
import { Language } from '../../language/schemas/language.schema';
import { Category } from '../../categories/schemas/category.schema';

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ versionKey: false })
export class Menu {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  })
  category_id: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restourant',
  })
  restourant_id: Restourant;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  image_url: string;

  @Prop()
  status: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
  })
  language_id: Language;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
