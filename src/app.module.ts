import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { RestourantModule } from './restourant/restourant.module';
import { TablesModule } from './tables/tables.module';
import { MenuModule } from './menu/menu.module';
import { LanguageModule } from './language/language.module';
import { CategoriesModule } from './categories/categories.module';
import { ManagersModule } from './managers/managers.module';
import { ClientModule } from './client/client.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    RestourantModule,
    TablesModule,
    MenuModule,
    LanguageModule,
    CategoriesModule,
    ManagersModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
