import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import {
  Restourant,
  RestourantDocument,
} from '../restourant/schemas/restourant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tables, TablesDocument } from './schemas/table.schema';
import * as QRCode from 'qrcode';
import * as fs from "fs"
import * as path from "path";

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Restourant.name)
    private restourantModel: Model<RestourantDocument>,
    @InjectModel(Tables.name)
    private tablesModel: Model<TablesDocument>,
  ) {}
  // async generateQrCode(text: string):Promise<string>{

  // }

  async generateQrCodeFile(text: string, fileName:string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        '../public/qr-codes',
        `${fileName}.png`,
      );
      fs.mkdirSync(path.dirname(filePath), {recursive:true});
      fs.writeFileSync(filePath, qrCodeBuffer);

      return filePath
    } catch (error) {
      throw new Error("Failed to generate or save QR code")
    }
  }

  async create(createTableDto: CreateTableDto) {
    const { restourant_id } = createTableDto;
    const restourant = await this.restourantModel.findById(restourant_id);
    if (!restourant) {
      throw new BadRequestException('Restourant not found');
    }
    const newTable = await this.tablesModel.create(createTableDto);

    const baseUrl = `${process.env.API_URL}:${process.env.PORT}/api/menu`
    const link = `${baseUrl}/${restourant.id}/${newTable._id}`;
    await this.generateQrCodeFile(link, String(newTable._id));
    newTable.qr_code = link;
    await newTable.save();

    restourant.tables.push(newTable);
    await restourant.save();
    return newTable;
  }

  findAll() {
    return this.tablesModel.find().populate('restourant_id');
  }

  findOne(id: string) {
    return this.tablesModel.findById(id).populate('restourant_id');
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.tablesModel.findByIdAndUpdate(id, updateTableDto, { new: true });
  }

  remove(id: string) {
    return this.tablesModel.findByIdAndDelete(id);
  }
}
