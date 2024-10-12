import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateWaiterDto } from './dto/create-waiter.dto';
import { UpdateWaiterDto } from './dto/update-waiter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Waiter, WaiterDocument } from './schemas/waiter.schema';
import { Tables, TablesDocument } from '../tables/schemas/table.schema';

@Injectable()
export class WaiterService {
  constructor(
    @InjectModel(Waiter.name) private waiterModel: Model<WaiterDocument>,
    @InjectModel(Tables.name) private tablesModel: Model<TablesDocument>,
  ) {}

  async create(createWaiterDto: CreateWaiterDto) {
    const { table_id } = createWaiterDto;
    const table = await this.tablesModel.findById(table_id);
    if (!table) {
      throw new BadRequestException('Table not found');
    }
    const newWaiter = await this.waiterModel.create(createWaiterDto);
    return newWaiter;
  }

  async findAll() {
    return this.waiterModel.find().populate('table_id');
  }

  async findOne(id: string) {
    return this.waiterModel.findById(id).populate('table_id');
  }

  async update(id: string, updateWaiterDto: UpdateWaiterDto) {
    return this.waiterModel.findByIdAndUpdate(id, updateWaiterDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.waiterModel.findByIdAndDelete(id);
  }
}
