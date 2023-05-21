import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CourseType } from 'src/@types/courses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('courses-new-course')
  newCourse(@Payload() payload) {
    const course = new CourseType(payload.body);
    this.logger.log(`[courses-new-course]: ${JSON.stringify(course)}`);
    return this.appService.newCourse(course);
  }

  @MessagePattern('courses-list-courses')
  list(@Payload() payload) {
    this.logger.log(`[courses-list-courses]`);
    return this.appService.listCourses(payload);
  }
}
