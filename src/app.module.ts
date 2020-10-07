import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CardapioModule } from './cardapio/cardapio.module';
import { CategoryModule } from './categories/category.module';
import { DeliveryModule } from './delivery/delivery.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BusinessHoursModule } from './restaurante/restaurante.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
     // **** conexão com banco local ****
     // MongooseModule.forRoot('mongodb://localhost/nest')
     // **** conexão com meu banco de dados ****
     // MongooseModule.forRoot('mongodb+srv://db_user:yta2WCx5xBmDqR5R@cluster0-bsev4.gcp.mongodb.net/delivery?retryWrites=true&w=majority',
     // **** conexão com banco da fabrica de código ****
     // MongooseModule.forRoot('mongodb+srv://db_user:XOAUz2NhkBio5hVP@cluster0-sqxxz.gcp.mongodb.net/delivery?retryWrites=true&w=majority',
     // **** conexão com meu banco de dados passando as variaveis do arquivo .env****
     MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
      { useFindAndModify: false }),
   CategoryModule,
   DeliveryModule,
   BusinessHoursModule,
   CardapioModule,
   UsersModule,
   AuthModule,
   RestaurantModule,
   OrdersModule,
 ],
 controllers: [
    AppController
 ],
 providers: [
    AppService
 ],
})
export class AppModule { }
