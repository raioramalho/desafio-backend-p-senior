import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthController } from './routes/auth/auth.controller';
import SalesController from './routes/sales/sale.controller';
import { CoursesController } from './routes/courses/courses.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './token/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule, PassportModule],
  controllers: [
    AppController,
    AuthController,
    SalesController,
    CoursesController,
  ],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
