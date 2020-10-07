import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from 'src/auth/shared/admin/jwt-admin-auth.guard';
import { IOrderRequest } from './shared/iorder-request';
import { Order } from './shared/order';
import { OrderStatusEnum } from './shared/order-status.enum';
import { OrdersService } from './shared/orders.service';

@UseGuards(JwtAdminAuthGuard)
@Controller('orders')
export class OrdersController {

    constructor(
        private ordersService: OrdersService
    ) { }

    @Get()
    async getAll(@Request() req): Promise<Order[]> {
        if (req?.query?.open) {
            return this.ordersService.getAllOpen(req?.query?.open === 'true');
        } else {
            return this.ordersService.getAll();
        }
    }

    @Get(':id')
    async getById(@Param('id') id): Promise<Order> {
        return this.ordersService.getById(id);
    }

    @Post()
    async create(@Body() order: IOrderRequest): Promise<Order> {
        return this.ordersService.create(order);
    }

    @Put(':id')
    async updateStatus(@Param('id') id: string, @Body() body: { newStatus: OrderStatusEnum }): Promise<Order> {
        return this.ordersService.updateStatus(id, body.newStatus);
    }
}

