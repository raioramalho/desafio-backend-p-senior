import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SalesType } from 'src/@types/sales';
import { CourseType } from 'src/@types/courses';

@Controller('event')
export class EventController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(EventController.name);

  @EventPattern('courses-new-course')
  newCourse(@Payload() payload) {
    const course = new CourseType(payload.body);
    this.logger.log(`[courses-new-course]: ${JSON.stringify(course)}`);
    return this.appService.newCourse(course);
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
