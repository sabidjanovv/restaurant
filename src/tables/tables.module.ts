import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tables, TablesSchema } from './schemas/table.schema';
import { Restourant, RestourantSchema } from '../restourant/schemas/restourant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tables.name,
        schema: TablesSchema,
      },
      {
        name: Restourant.name,
        schema: RestourantSchema,
      },
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
