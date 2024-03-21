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
        pass: 'bjlf npye ljfj zehy', // Repl with your Gmail password or app-specific password
      },
    });
  }

  async sendVerificationEmail(to: string, code: string) {
    const mailOptions = {
      from: 'yohannesgetachew.e@gmail.com', // Sender email address
      to: to, // Recipient email address
      subject: 'Email Verification', // Email subject
      html: `
      <h1 style="color: blue;">Email Verification</h1>
      <p style="color: green;">Your verification code is: <strong>${code}</strong></p>
    `, // HTML body
  };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }


   async sendPasswordResetEmail(to: string, code: string) {
    const mailOptions = {
      from: 'yohannesgetachew.e@gmail.com',
      to: to,
      subject: 'Password Reset',
      html: `
        <h1 style="color: blue;">Password Reset</h1>
        <p style="color: green;">Your password reset code is: <strong>${code}</strong></p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}

