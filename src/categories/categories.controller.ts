import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { Category } from './shared/category';
import { CategoriesService } from './shared/categories.service';
import { JwtAdminAuthGuard } from 'src/auth/shared/admin/jwt-admin-auth.guard';

//@UseGuards(JwtAdminAuthGuard)
@Controller('categories')
export class CategoriesController {

    constructor(
        private categoriesService: CategoriesService
    ) {}

    @Get()
    async getAll() {
       return await this.categoriesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
       return await this.categoriesService.getById(id);
    }

    @Post()
    async create(@Body() category: Category) {
       return await this.categoriesService.create(category);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() category: Category) {
       return await this.categoriesService.update(id, category,);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
       return await this.categoriesService.delete(id);
    }
}
