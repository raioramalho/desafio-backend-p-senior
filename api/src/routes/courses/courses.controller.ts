import {
  Body,
  Controller,
  Get,
  Logger,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { CustomError } from 'src/helpers/errors/response.error';
import { JwtAuthGuard } from 'src/token/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController implements OnModuleInit {
  private readonly logger = new Logger(CoursesController.name);
  async onModuleInit() {
    const requestPatters = ['courses-list-courses', 'courses-new-course'];
    requestPatters.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
      this.client.connect;
    });
  }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'courses-api',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'courses-consumer',
        allowAutoTopicCreation: true,
      },
      producer: {
        transactionalId: 'courses-producer',
        allowAutoTopicCreation: true,
        idempotent: false,
      },
    },
  })
  private client: ClientKafka;

  bufferize(data: any) {
    return Buffer.from(JSON.stringify(data));
  }

  @Get('/list')
  async listCourses(@Req() request: Request) {
    const payload = request.headers.authorization.split(' ')[1];
    const result = await this.client
      .send('courses-list-courses', this.bufferize(payload))
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }

  @Post('/new')
  async newCourse(@Body() data, @Req() request: Request) {
    data['uuid'] = randomUUID();
    const payload = {
      body: data,
      token: request.headers.authorization.split(' ')[1],
    };
    const result = await this.client
      .send('courses-new-course', this.bufferize(payload))
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }
}
