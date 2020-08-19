// ele chamou de business-hours.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessHoursController } from './restaurante.controller';
import { BusinessHourSchema } from './schemas/restaurante.schema';
import { BusinessHourService } from './shared/restaurante.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'BusinessHour', schema: BusinessHourSchema }
        ])
    ],
    controllers: [
        BusinessHoursController
    ],
    providers: [
        BusinessHourService
    ],
})
export class BusinessHoursModule { }