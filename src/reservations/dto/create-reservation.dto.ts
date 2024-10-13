export class CreateReservationDto {
  client_id: string;
  restourant_id: string;
  table_id: string;
  reservation_time: Date;
  number_of_guests: number;
  status_id: string;
}
