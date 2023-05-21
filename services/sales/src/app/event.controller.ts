import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CourseType } from 'src/@types/courses';
import UserType from 'src/@types/user';

@Controller('event')
export class EventController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(EventController.name);

  @EventPattern('auth-new-user')
  login(@Payload() payload) {
    const user = new UserType(payload);
    this.logger.log(`[auth-new-user]: ${JSON.stringify(user)}`);
    return this.appService.singup(user);
  }

  @EventPattern('courses-new-course')
  newCourse(@Payload() payload) {
    const course = new CourseType(payload.body);
    this.logger.log(`[courses-new-course]: ${JSON.stringify(course)}`);
    return this.appService.newCourse(course);
  }
}
