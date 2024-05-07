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
      const initializeResponse = await this.initializeTransaction(userId, courseId, txRef);
        if (initializeResponse.status === 'success') {
        } else {
            throw new Error('Payment initialization failed.');
        }
      const verifyResponse = await this.verifyTransaction(txRef);
      if (verifyResponse.status === 'success') {
        await this.savePaymentDetails(userId, courseId, txRef);
      } else {
        throw new Error('Payment verification failed.');
      }
    } catch (error) {
      throw new Error('Payment processing failed.');
    }
  }

  async initializeTransaction(userId: number, courseId: number, txRef: string): Promise<any> {
    try {
      const secretKey = 'CHASECK_TEST-Ehg0EssyVj9DdphYtZuUeUce6SzyUhdi'; // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const paymentDetails = {
        amount: '200', // Example amount
        currency: 'ETB', // Example currency
        email: 'john@gmail.com', // Example email
        first_name: userId, // Example first name
        last_name: userId, // Example last name
        tx_ref: txRef,
        callback_url: 'https://example.com/callback', // Example callback URL
        return_url: 'https://example.com/return', // Example return URL
        customization: {
          title: courseId, // Example title
          description: 'Test Description', // Example description
        },
      };
      const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`, // Include secret key as bearer token
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

  async verifyTransaction(txRef: string): Promise<any> {
    try {
      const secretKey = 'YOUR_SECRET_KEY'; // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
        headers: {
          'Authorization': `Bearer ${secretKey}`, // Include secret key as bearer token
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        return responseData;
      } else {
        throw new Error('Failed to verify transaction.');
      }
    } catch (error) {
      throw new Error('Transaction verification failed.');
    }
  }

  async savePaymentDetails(userId: number, courseId: number, txRef: string): Promise<void> {
    const paidCourse = new PaidCourse();
    paidCourse.user_id = userId;
    paidCourse.course_id = courseId;
    paidCourse.tx_ref = txRef;

    try {
      await this.paidCourseRepository.save(paidCourse);
    } catch (error) {
      throw new Error('Failed to save payment details.');
    }
  }

  generateTransactionReference(): string {
    return 'TX-' + Math.random().toString(36).substr(2, 9);
  }
}