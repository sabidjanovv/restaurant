import { Injectable } from '@nestjs/common';
import { CreateRestourantDto } from './dto/create-restourant.dto';
import { UpdateRestourantDto } from './dto/update-restourant.dto';
import { Restourant, RestourantDocument } from './schemas/restourant.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestourantService {
  constructor(
    @InjectModel(Restourant.name) private restourantModel: Model<RestourantDocument>,
  ) {}
  create(createRestourantDto: CreateRestourantDto) {
    return this.restourantModel.create(createRestourantDto);
  }

  findAll() {
    return this.restourantModel.find().populate("tables");
  }

  findOne(id: string) {
    return this.restourantModel.findById(id).populate("tables");
  }

  update(id: string, updateRestourantDto: UpdateRestourantDto) {
    return this.restourantModel.findByIdAndUpdate(id, updateRestourantDto, { new: true });
  }

  remove(id: string) {
    return this.restourantModel.findByIdAndDelete(id);
  }
}
