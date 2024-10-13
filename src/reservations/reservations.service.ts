import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const newReservation = new this.reservationModel(createReservationDto);
    return newReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .populate('client_id restourant_id table_id status_id')
      .exec();
  }

  async findOne(id: string): Promise<Reservation> {
    return this.reservationModel
      .findById(id)
      .populate('client_id restourant_id table_id status_id')
      .exec();
  }

  async update(
    id: string,
    updateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Reservation> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
