import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schemas/client.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';


@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}


  async create(createClientDto: CreateClientDto, res: Response) {
    const existingClient = await this.clientModel.findOne({
      email: createClientDto.email,
    });
    if (existingClient) {
      throw new BadRequestException('Foydalanuvchi allaqachon mavjud!');
    }
    if (createClientDto.password !== createClientDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 7);
    const newClient = await this.clientModel.create({
      ...createClientDto,
      hashed_password,
    });

    await newClient.save(); 
    return newClient
  }



  findAll() {
    return this.clientModel.find();
  }

  findOne(id: string) {
    return this.clientModel.findById(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const existingClient = await this.clientModel.findOne({
      email: updateClientDto.email,
    });
    const client = await this.clientModel.findById(id)
    
    if (existingClient && client.email !== updateClientDto.email) {
      throw new BadRequestException('Foydalanuvchi allaqachon mavjud!');
    }
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
