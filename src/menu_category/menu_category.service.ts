import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
// import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { InjectModel } from '@nestjs/mongoose';
// import { Food_categories } from './schemas/food_category.schema';
import { Model } from 'mongoose';
import { Language } from '../language/schemas/language.schema';
import { MenuCategory } from './schemas/menu_category.entity';
import { CreateMenuCategoryDto } from './dto/create-menu_category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu_category.dto';

@Injectable()
export class MenuCategoriesService {
  constructor(
    @InjectModel(MenuCategory.name)
    private menuCategoriesModel: Model<MenuCategory>,
    @InjectModel(Language.name) private langModel: Model<Language>,
  ) {}

  create(createMenuCategoryDto: CreateMenuCategoryDto) {
    const { language_id } = createMenuCategoryDto;
    const language = this.langModel.findById(language_id);
    if (!language) {
      throw new BadRequestException('This is language not found');
    }

    return 'This action adds a new foodCategory';
  }

  findAll() {
    return this.menuCategoriesModel.find();
  }

  findOne(id: string) {
    return this.menuCategoriesModel.findById(id);
  }

  async update(
    id: string,
    dynamicFields: Record<string, string>
  ) {
    let newName: Record<string, string>;
    newName = {['name_'+'tr']:'pilav'};
    const update = {$set: newName};
    console.log(update);
    console.log(id);
    
    return this.menuCategoriesModel.findByIdAndUpdate(
      id,
      update,
      { new: true, strict: false,}
    )
  }

  async updateLangById(id: string, updateMenuCategoryDto: UpdateMenuCategoryDto){
    const lang = await this.langModel.findById(updateMenuCategoryDto.lang_id)

    return this.menuCategoriesModel.findByIdAndUpdate(id,
      {['name_'+lang.code]:updateMenuCategoryDto.value},
      {new:true, strict:false}
    )
  }


  remove(id: string) {
    return this.menuCategoriesModel.findByIdAndDelete(id);
  }
}
