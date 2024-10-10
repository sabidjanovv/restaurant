import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestourantService } from './restourant.service';
import { CreateRestourantDto } from './dto/create-restourant.dto';
import { UpdateRestourantDto } from './dto/update-restourant.dto';

@Controller('restourant')
export class RestourantController {
  constructor(private readonly restourantService: RestourantService) {}

  @Post()
  create(@Body() createRestourantDto: CreateRestourantDto) {
    return this.restourantService.create(createRestourantDto);
  }

  @Get()
  findAll() {
    return this.restourantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restourantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestourantDto: UpdateRestourantDto) {
    return this.restourantService.update(id, updateRestourantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restourantService.remove(id);
  }
}
