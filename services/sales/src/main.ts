import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const looger = new Logger('sales-service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'sales-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          //DEFININDO GRUPO DO MICRO
          groupId: 'sales-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app.listen();
  looger.log('sales-service is running!');
}
bootstrap();
