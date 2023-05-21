import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import UserType from 'src/@types/user';
import { SalesType } from 'src/@types/sales';

@Controller('event')
export class EventController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(EventController.name);

  @EventPattern('auth-new-user')
  newUser(@Payload() payload) {
    this.logger.log(`[auth-new-user]: ${JSON.stringify(payload)}`);
    const user = new UserType(payload);
    return this.appService.singup(user);
  }

  @EventPattern('sales-new-sale')
  newSale(@Payload() payload) {
    const sale = new SalesType(payload.body);
    this.logger.log(`[sales-new-sale]: ${JSON.stringify(sale)}`);
    return this.appService.newSale(sale);
  }

  @EventPattern('sales-cancel-sale')
  cancelSale(@Payload() payload) {
    const sale = new SalesType(payload.body);
    this.logger.log(`[sales-cancel-sale]: ${JSON.stringify(sale)}`);
  }
}
