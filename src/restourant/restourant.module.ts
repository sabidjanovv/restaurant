import { Module } from '@nestjs/common';
import { RestourantService } from './restourant.service';
import { RestourantController } from './restourant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restourant, RestourantSchema } from './schemas/restourant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restourant.name,
        schema: RestourantSchema,
      },
    ]),
  ],
  controllers: [RestourantController],
  providers: [RestourantService],
})
export class RestourantModule {}
