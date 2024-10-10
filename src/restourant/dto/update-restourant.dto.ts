import { PartialType } from '@nestjs/swagger';
import { CreateRestourantDto } from './create-restourant.dto';

export class UpdateRestourantDto extends PartialType(CreateRestourantDto) {}
