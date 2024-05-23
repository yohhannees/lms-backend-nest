/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from './unit.controller';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';
import { UserService } from 'src/auth/user.service';
import { User } from 'src/auth/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmailService } from 'src/auth/email.service';
import { AuthController } from 'src/auth/auth.controller';
import { userGuard } from 'src/auth/userGuard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, User]),AuthModule],
  controllers: [UnitController,AuthController],
  providers: [UnitService,UserService,EmailService,userGuard,JwtModule,JwtService],
})
export class UnitModule{}
