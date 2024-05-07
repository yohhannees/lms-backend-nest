/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

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
    const data = {
      "amount": "100",
      "currency": "ETB",
      "email": "abebech_bekele@gmail.com",
      "first_name": "Bilen",
      "last_name": "Gizachew",
      "phone_number": "0912345678",
      "tx_ref": "chewaqdqwdst-6669",
      "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      "return_url": "https://www.google.com/",
      "customization": {
        "title": " merchant",
        "description": "I love online payments"
      }
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer CHASECK_TEST-Ehg0EssyVj9DdphYtZuUeUce6SzyUhdi'
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch('https://api.chapa.co/v1/transaction/initialize', config);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error('Payment initialization failed.');
    }
  }
}