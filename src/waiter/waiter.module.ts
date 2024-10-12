import { Module } from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { WaiterController } from './waiter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Waiter, WaiterSchema } from './schemas/waiter.schema';
import { Tables, TablesSchema } from '../tables/schemas/table.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Waiter.name, schema: WaiterSchema },
      { name: Tables.name, schema: TablesSchema },
    ]),
  ],
  controllers: [WaiterController],
  providers: [WaiterService],
})
export class WaiterModule {}
