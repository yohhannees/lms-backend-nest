import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaidCourse } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaidCourse])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
