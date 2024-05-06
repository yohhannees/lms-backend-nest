/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
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
      const secretKey = 'TUbW5C7D2Nr7fXIPyZiVjjU1'; // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const paymentDetails = {

        amount: '200', // Example amount
        currency: 'ETB', // Example currency
        email: 'john@gmail.com', // Example email
        first_name: 'John', // Example first name
        last_name: 'Doe', // Example last name
        tx_ref: txRef,
        callback_url: 'https://example.com/callback', // Example callback URL
        return_url: 'https://example.com/return', // Example return URL
        customization: {
          title: 'Test Title', // Example title
          description: 'Test Description', // Example description
        },
      };
      const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', paymentDetails, {
        headers: {
          Authorization: `Bearer ${secretKey}`, // Include secret key as bearer token
          'Content-Type': 'application/json', // Specify content type as JSON
        },
      });
      if (response.status === 200) {
        return response.data.data;
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
      const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
        headers: {
          Authorization: `Bearer ${secretKey}`, // Include secret key as bearer token
        },
      });
      if (response.status === 200) {
        return response.data;
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
