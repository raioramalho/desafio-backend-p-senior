import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Buffer } from 'buffer';
import UserType from 'src/@types/user';
import PayloadType from 'src/@types/payload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  bufferize(data: any) {
    return Buffer.from(JSON.stringify(data));
  }

  @MessagePattern('auth-login')
  login(@Payload() payload) {
    const user = new UserType(payload);
    this.logger.log(`[auth-login]: ${JSON.stringify(user)}`);
    return this.appService.login(user);
  }

  @MessagePattern('auth-new-user')
  newUser(@Payload() payload) {
    const user = new UserType(payload);
    this.logger.log(`[auth-new-user]: ${JSON.stringify(user)}`);
    return this.appService.singup(user);
  }

  @MessagePattern('auth-list-users')
  listUsers(@Payload() payload: PayloadType) {
    this.logger.log(`[auth-list-users]`);
    return this.appService.list(payload.token);
  }
}
