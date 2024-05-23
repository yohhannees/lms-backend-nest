/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { EmailService } from './email.service';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, EmailService, JwtModule, JwtService],
})
export class AuthModule {}
