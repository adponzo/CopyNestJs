import { JwtCustomerAuthGuard } from './../../auth/shared/customer/jwt-customer-auth.guard';
import { AddressService } from './address.service';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Address } from './address';

@UseGuards(JwtCustomerAuthGuard)
@Controller('customers-addresses')
export class CustomersAddressesController {

    constructor(
        private addresService: AddressService
    ) {}

    @Get()
    async getAllByUser(@Request() req: any): Promise<Address[]> {
        console.log(req.user);
        return this.addresService.getAllByUser(req.user.sub);
    }
}
