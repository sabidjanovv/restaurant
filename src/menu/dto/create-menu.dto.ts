import { Category } from "../../categories/schemas/category.schema";
import { Language } from "../../language/schemas/language.schema";
import { Restourant } from "../../restourant/schemas/restourant.schema";

export class CreateMenuDto {
  category_id: Category;
  restourant_id: Restourant;
  name: string;
  description: string;
  price: string;
  image_url: string;
  status: boolean;
  language_id: Language;
}
