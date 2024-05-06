/* eslint-disable prettier/prettier */
// payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import axios from 'axios';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('purchase')
  async purchaseCourse(@Body() body: { userId: number; courseId: number }): Promise<void> {
    const { userId, courseId } = body;
    try {
      await this.paymentService.processPayment(userId, courseId);
    } catch (error) {
      throw new Error('Payment processing failed.');
    }
  }
  @Post('test')
  async initializePayment(): Promise<any> {
    try {
    //   const secretKey = 'CHAPUBK_TEST-HKn8HXy88rUjfYQg5jDkD9qgOYU34ojq'; 
    //   const secretKey = 'CHASECK_TEST-Ehg0EssyVj9DdphYtZuUeUce6SzyUhdi'; 
    //   const secretKey = 'TUbW5C7D2Nr7fXIPyZiVjjU1'; 
      const options = {
        method: 'POST',
        url: 'https://api.chapa.co/v1/transaction/initialize',
        headers: {
          Authorization: `Bearer CHASECK_TEST-Ehg0EssyVj9DdphYtZuUeUce6SzyUhdi`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: '100',
          currency: 'ETB',
          email: 'abebech_bekele@gmail.com',
          first_name: 'Bilen',
          last_name: 'Gizachew',
          phone_number: '0912345678',
          tx_ref: 'chewatatest-6669',
          callback_url: 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
          return_url: 'https://www.google.com/',
          customization: {
            title: 'Payment for my favourite merchant',
            description: 'I love online payments',
          },
        }),
      };
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error('Failed to initialize transaction:', error);
      throw new Error('Transaction initialization failed.');
    }
  }
}

