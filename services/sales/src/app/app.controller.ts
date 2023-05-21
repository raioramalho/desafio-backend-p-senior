import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalesType } from 'src/@types/sales';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('sales-new-sale')
  newSale(@Payload() payload) {
    const sale = new SalesType(payload.body);
    this.logger.log(`[sales-new-sale]: ${JSON.stringify(sale)}`);
    return this.appService.newSale(sale);
  }

  @MessagePattern('sales-cancel-sale')
  cancelSale(@Payload() payload) {
    const sale = new SalesType(payload.body);
    this.logger.log(`[sales-cancel-sale]: ${JSON.stringify(sale)}`);
    return payload;
  }

  @MessagePattern('sales-list-sales')
  listSales() {
    return this.appService.listSales();
  }
}
