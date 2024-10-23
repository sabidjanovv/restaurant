import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
  @ApiProperty({ description: "Name of the client" })
  name: string;

  @ApiProperty({ description: "Telegram link of the client" })
  tg_link: string;

  @ApiProperty({ description: "Email of the client", uniqueItems: true })
  email: string;

  @ApiProperty({ description: "Password for the client" })
  password: string;

  @ApiProperty({ description: "Password confirmation" })
  confirm_password: string;

  @ApiProperty({ description: "Phone number of the client" })
  phone: string;
}
