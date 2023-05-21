import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const looger = new Logger('courses-service');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'courses-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          //DEFININDO GRUPO DO MICRO
          groupId: 'courses-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app.listen();
  looger.log('courses-service is running!');
}
bootstrap();
