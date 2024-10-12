import { Module } from '@nestjs/common';
import { MenuCategoriesService } from './menu_category.service';
import { MenuCategoriesController } from './menu_category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuCategoriesSchema, MenuCategory } from './schemas/menu_category.entity';
import { Language, LanguageSchema } from '../language/schemas/language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MenuCategory.name,
        schema: MenuCategoriesSchema,
      },
      {
        name: Language.name,
        schema: LanguageSchema,
      },
    ]),
  ],
  controllers: [MenuCategoriesController],
  providers: [MenuCategoriesService],
})
export class MenuCategoryModule {}
