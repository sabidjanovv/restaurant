import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status, StatusDocument } from './schemas/status.schema';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const newStatus = new this.statusModel(createStatusDto);
    return newStatus.save();
  }

  async findAll(): Promise<Status[]> {
    return this.statusModel.find().exec();
  }

  async findOne(id: string): Promise<Status> {
    return this.statusModel.findById(id).exec();
  }

  async update(id: string, updateStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusModel
      .findByIdAndUpdate(id, updateStatusDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Status> {
    return this.statusModel.findByIdAndDelete(id).exec();
  }
}
