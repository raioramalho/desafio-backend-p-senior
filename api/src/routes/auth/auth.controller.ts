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
import { Client, Transport, ClientKafka } from '@nestjs/microservices';
import { Buffer } from 'buffer';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { CustomError } from 'src/helpers/errors/response.error';
import { JwtAuthGuard } from 'src/token/jwt.guard';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private readonly logger = new Logger(AuthController.name);

  async onModuleInit() {
    const requestPatters = ['auth-login', 'auth-new-user', 'auth-list-users'];
    requestPatters.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
      this.client.connect;
    });
  }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth-api',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
        allowAutoTopicCreation: true,
      },
      producer: {
        transactionalId: 'auth-producer',
        allowAutoTopicCreation: true,
        idempotent: false,
      },
    },
  })
  private client: ClientKafka;

  bufferize(data: any) {
    return Buffer.from(JSON.stringify(data));
  }

  @Post('/login')
  async login(@Body() data) {
    const result = await this.client
      .send('auth-login', this.bufferize(data))
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }

  @Post('/new')
  async newUser(@Body() data) {
    data['uuid'] = randomUUID();
    const result = await this.client
      .send('auth-new-user', this.bufferize(data))
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async listUsers(@Req() request: Request) {
    const payload = {
      body: null,
      token: request.headers.authorization.split(' ')[1],
    };
    const result = await this.client
      .send('auth-list-users', payload)
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }
}
