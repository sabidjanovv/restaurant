import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Restourant, RestourantSchema } from '../restourant/schemas/restourant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { Language, LanguageSchema } from '../language/schemas/language.schema';
import { MenuCategory, MenuCategoriesSchema } from '../menu_category/schemas/menu_category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Menu.name,
        schema: MenuSchema,
      },
      {
        name: MenuCategory.name,
        schema: MenuCategoriesSchema,
      },
      {
        name: Restourant.name,
        schema: RestourantSchema,
      },
      {
        name: Language.name,
        schema: LanguageSchema,
      },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
