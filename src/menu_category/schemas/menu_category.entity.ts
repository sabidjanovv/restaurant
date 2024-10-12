import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuCategoryDocument = HydratedDocument<MenuCategory>;

@Schema({ versionKey: false })
export class MenuCategory {
  @Prop()
  name_uz: string;

  @Prop()
  name_ru: string;

  @Prop()
  name_en: string;

  @Prop()
  description: string;
}

export const MenuCategoriesSchema =
  SchemaFactory.createForClass(MenuCategory);
