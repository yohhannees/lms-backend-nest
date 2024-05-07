/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaidCourse } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaidCourse)
    private readonly paidCourseRepository: Repository<PaidCourse>,
  ) {}

  async processPayment(userId: number, courseId: number): Promise<void> {
    try {
      const txRef = this.generateTransactionReference();
      await this.initializeTransaction(userId.toString(), courseId.toString(), txRef);
      // await this.savePaymentDetails(userId, courseId, txRef);
    } catch (error) {
      throw new Error('Payment processing failed.');
    }
  }

  async initializeTransaction(userId: string, courseId: string, txRef: string): Promise<any> {
    try {
      // const secretKey = 'CHASECK_TEST-03GLYZuJTIrsX63PY7HpMn4J6IWqVNeY';

      const paymentDetails = {
        amount: '200',
        currency: 'ETB',
        email: 'john@gmail.com',
        first_name: userId,
        last_name: userId,
        tx_ref: txRef,
        callback_url: 'https://example.com/callback',
        return_url: 'https://example.com/return',
        customization: {
          title: courseId,
          description: 'Test Description',
        },
      };
      const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer CHASECK_TEST-03GLYZuJTIrsX63PY7HpMn4J6IWqVNeY'
        },
        body: JSON.stringify(paymentDetails),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        return responseData.data;
      } else {
        throw new Error('Failed to initialize transaction.');
      }
    } catch (error) {
      throw new Error('Transaction initialization failed.');
    }
  }

  // async savePaymentDetails(userId: number, courseId: number, txRef: string): Promise<void> {
  //   const paidCourse = new PaidCourse();
  //   paidCourse.user_id = userId;
  //   paidCourse.course_id = courseId;
  //   paidCourse.tx_ref = txRef;

  //   try {
  //     await this.paidCourseRepository.save(paidCourse);
  //   } catch (error) {
  //     throw new Error('Failed to save payment details.');
  //   }
  // }

  generateTransactionReference(): string {
    return 'TX-' + Math.random().toString(36).substr(2, 9);
  }
}
