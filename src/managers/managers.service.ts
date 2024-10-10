import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Restourant, RestourantDocument } from '../restourant/schemas/restourant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Restourant.name)
    private restourantModel: Model<RestourantDocument>,
    @InjectModel(Manager.name)
    private managerModel: Model<ManagerDocument>,
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    const { restourant_id } = createManagerDto;
    const restourant = await this.restourantModel.findById(restourant_id);
    if (!restourant) {
      throw new BadRequestException('Restourant not found');
    }

    const existingManager = await this.managerModel.findOne({
      email: createManagerDto.email,
    });
    if (existingManager) {
      throw new BadRequestException('Foydalanuvchi allaqachon mavjud!');
    }
    if (createManagerDto.password !== createManagerDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createManagerDto.password, 7);
    const newManager = await this.managerModel.create({
      ...createManagerDto,
      hashed_password,
    });

    restourant.managers.push(newManager);
    await restourant.save();
    return newManager;
  }

  findAll() {
    return this.managerModel.find().populate('restourant_id');
  }

  findOne(id: string) {
    return this.managerModel.findById(id).populate('restourant_id')
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const existingManager = await this.managerModel.findOne({
      email: updateManagerDto.email,
    });
    const manager = await this.managerModel.findById(id);

    if (existingManager && manager.email !== updateManagerDto.email) {
      throw new BadRequestException('Bunday emailli Manager mavjud!');
    }
    return this.managerModel.findByIdAndUpdate(id, updateManagerDto, {new:true});
  }

  remove(id: string) {
    return this.managerModel.findByIdAndDelete(id);
  }
}
