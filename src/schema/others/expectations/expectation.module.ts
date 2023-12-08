/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expectation } from './expectation.entity';
import { ExpectationController } from './expectation.controller';
import { ExpectationService } from './expectation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expectation])],
  controllers: [ExpectationController],
  providers: [ExpectationService],
})
export class ExpectationModule {}
