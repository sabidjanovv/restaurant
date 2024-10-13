export class CreatePaymentDto {
  reservation_id: string;
  amount: number;
  payment_method: string;
  payment_status: string;
  transaction_id: string;
  currency: string;
}
