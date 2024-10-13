import { Language } from "../../language/schemas/language.schema";
import { MenuCategory } from "../../menu_category/schemas/menu_category.entity";
import { Restourant } from "../../restourant/schemas/restourant.schema";

export class CreateMenuDto {
  category_id: MenuCategory;
  restourant_id: Restourant;
  name: string;
  description: string;
  price: string;
  image_url: string;
  status: boolean;
  language_id: Language;
}
