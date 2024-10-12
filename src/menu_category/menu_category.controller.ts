import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu_category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu_category.dto';
import { MenuCategoriesService } from './menu_category.service';
// import { menuCategoriesService } from './menu_categories.service';
// import { CreatemenuCategoryDto } from './dto/create-menu_category.dto';
// import { UpdatemenuCategoryDto } from './dto/update-menu_category.dto';

@Controller('menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Get()
  findAll() {
    return this.menuCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dynamicFields:Record<string, string>
  ) {
    return this.menuCategoriesService.update(id, dynamicFields);
  }

  @Patch(':id')
  updateLangById(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto
  ) {
    return this.menuCategoriesService.updateLangById(id, updateMenuCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCategoriesService.remove(id);
  }
}
