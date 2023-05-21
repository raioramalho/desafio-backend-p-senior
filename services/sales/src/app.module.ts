import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { PrismaService } from './app/prisma.service';
import { EventController } from './app/event.controller';

@Module({
  imports: [],
  controllers: [AppController, EventController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
