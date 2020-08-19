// ele chamou de business-hours.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BusinessHour } from './shared/restaurante';
import { BusinessHourService } from './shared/restaurante.service';
import { JwtAdminAuthGuard } from 'src/auth/shared/admin/jwt-admin-auth.guard';

//@UseGuards(JwtAdminAuthGuard)
@Controller('businesshours')
export class BusinessHoursController {

    constructor(
        private businessHourService: BusinessHourService
    ) { }

    @Get()
    async getAll() {
        return await this.businessHourService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.businessHourService.getById(id);
    }

    @Post()
    async create(@Body() businessHour: BusinessHour) {
        return await this.businessHourService.create(businessHour);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() businessHour: BusinessHour) {
        return this.businessHourService.update(id, businessHour);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.businessHourService.delete(id);
    }
}