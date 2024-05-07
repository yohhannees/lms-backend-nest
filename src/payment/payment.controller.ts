/* eslint-disable prettier/prettier */
import { PaidCourse } from './payment.entity';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Body, Post, Controller, Get, Param } from '@nestjs/common';

@Controller()
export class PaymentController {
  constructor(
    @InjectRepository(PaidCourse)
    private readonly paidCourseRepository: Repository<PaidCourse>,
  ) {}

  @Post('buy')
  async initializePayment(@Body() paymentData: { userId: string, courseId: string }): Promise<any> {
    const { userId, courseId } = paymentData;
    const txRef = `chet-${userId}-${courseId}-${Math.random().toString(36).substr(2, 9)}`;

    const data = {
      amount: "100",
      currency: "ETB",
      email: "abebech_bekele@gmail.com",
      first_name: userId.toString(),
      last_name: "Gizachew",
      tx_ref: txRef,
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: "https://www.google.com/",
      customization: {
        title: courseId.toString(),
        description: "I love online payments"
      }
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer CHASECK_TEST-03GLYZuJTIrsX63PY7HpMn4J6IWqVNeY'
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch('https://api.chapa.co/v1/transaction/initialize', config);
      const responseData = await response.json();

      // Create a new PaidCourse record
      const paidCourse = new PaidCourse();
      paidCourse.user_id = Number(userId);
      paidCourse.course_id = Number(courseId);
      paidCourse.tx_ref = txRef;
      paidCourse.paid = false;

      // Save the new PaidCourse record
      await this.paidCourseRepository.save(paidCourse);

      return responseData;
    } catch (error) {
      throw new Error('Payment initialization failed.');
    }
  }



  @Get('verify/:courseId/:userId')
  async verifyTransaction(
    @Param('courseId') courseId: number,
    @Param('userId') userId: number,
  ): Promise<string> {
    // Find the PaidCourse record with the given courseId and userId
    const paidCourse = await this.paidCourseRepository.findOne({ where: { user_id: userId, course_id: courseId } });
  
    if (!paidCourse) {
      throw new Error('No transaction found for the given courseId and userId.');
    }
  
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer CHASECK_TEST-03GLYZuJTIrsX63PY7HpMn4J6IWqVNeY'
      }
    };
  
    try {
      const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${paidCourse.tx_ref}`, options);
      const responseData = await response.json();
  
      // Assuming responseData.status indicates a successful payment
      if (responseData.status === 'success') {
        // Update the paid field to true
        paidCourse.paid = true;
        await this.paidCourseRepository.save(paidCourse);
        return 'paid';
      } else {
        return 'payment failed';
      }
    } catch (error) {
      throw new Error('Transaction verification failed.');
    }
  
}
}