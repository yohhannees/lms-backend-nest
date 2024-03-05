/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yohannesgetachew.e@gmail.com', // Replace with your Gmail address
        pass: 'akiya@dagim@123', // Replace with your Gmail password or app-specific password
      },
    });
  }

  async sendVerificationEmail(to: string, code: string) {
    const mailOptions = {
      from: 'yohannesgetachew.e@gmail.com', // Sender email address
      to: to, // Recipient email address
      subject: 'Email Verification', // Email subject
      text: `Your verification code is: ${code}`, // Email body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }
}

