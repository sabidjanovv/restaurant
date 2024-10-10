import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Restourant, RestourantSchema } from '../restourant/schemas/restourant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manager.name,
        schema: ManagerSchema,
      },
      {
        name: Restourant.name,
        schema: RestourantSchema,
      },
    ]),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
