import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtCustomerAuthGuard } from 'src/auth/shared/customer/jwt-customer-auth.guard';
import { IOrderRequest } from './shared/iorder-request';
import { Order } from './shared/order';
import { OrdersService } from './shared/orders.service';

@UseGuards(JwtCustomerAuthGuard)
@Controller('customers-orders')
export class CustomersOrdersController {

    constructor(
        private ordersService: OrdersService
    ) {}

    @Get()
    async getAll(@Request() req): Promise<Order[]> {        
        
        // se veio o parametro "open"
        if (req?.query?.open) {            
            return this.ordersService.getAllOpenByUser(req.user.sub, req?.query?.open === 'true');
        } else {
            return this.ordersService.getAllByUser(req.user.sub);
        }
    }

    @Post()
    async create(@Body() order: IOrderRequest, @Request() req): Promise<Order> {
        // um usuário não pode criar pedido para outro usuário
        if (req.user.sub !== order.customer.id)
            throw new UnauthorizedException();

        return this.ordersService.create(order);
    }
}
