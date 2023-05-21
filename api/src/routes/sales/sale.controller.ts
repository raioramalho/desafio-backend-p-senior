import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  OnModuleInit,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { CustomError } from 'src/helpers/errors/response.error';
import { JwtAuthGuard } from 'src/token/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('sales')
export default class SalesController implements OnModuleInit {
  private readonly logger = new Logger(SalesController.name);

  async onModuleInit() {
    const requestPatters = [
      'sales-new-sale',
      'sales-list-sales',
      'sales-cancel-sale',
    ];
    requestPatters.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
      this.client.connect;
    });
  }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'sale-api',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'sales-consumer',
        allowAutoTopicCreation: true,
      },
      producer: {
        transactionalId: 'sales-producer',
        allowAutoTopicCreation: true,
        idempotent: false,
      },
    },
  })
  private client: ClientKafka;

  bufferize(data: any) {
    return Buffer.from(JSON.stringify(data));
  }

  @Post('/new')
  async newSale(@Body() data, @Req() request: Request) {
    data['uuid'] = randomUUID();
    const payload = {
      body: data,
      tokenr: request.headers.authorization.split(' ')[1],
    };
    const result = await this.client
      .send('sales-new-sale', this.bufferize(payload))
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }

  @Get('/list')
  async listSales(@Req() request: Request) {
    const payload = {
      body: null,
      token: request.headers.authorization.split(' ')[1],
    };
    const result = await this.client
      .send('sales-list-sales', payload)
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }

  @Delete('/cancel')
  async cancelSale(@Body() body, @Req() request: Request) {
    const payload = {
      body,
      token: request.headers.authorization.split(' ')[1],
    };
    const result = await this.client
      .send('sales-cancel-sale', payload)
      .toPromise();
    if (result?.error) {
      throw new CustomError(result?.message, result?.code);
    }
    return result;
  }
}
