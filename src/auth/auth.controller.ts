/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { fullname: string; email: string; password: string },
  ) {
    const { fullname, email, password } = body;
    const user = await this.userService.createUser(fullname, email, password);
    await this.userService.sendVerificationEmail(
      user.email,
      user.verificationCode,
    );
    const response = {
      success: true,
      message: 'User registered. Please check your email for verification.',
      data: null,
    };
    return response;
  }

  @Post('verify')
  async verifyEmail(@Body() body: { email: string; code: string }) {
    const { email, code } = body;
    const verified = await this.userService.verifyEmail(email, code);
    if (verified) {
      const response = {
        success: true,
        message: 'Email verified successfully.',
        data: null,
      };
      return response;
    } else {
      const response = {
        success: false,
        message: 'Invalid verification code.',
        data: null,
      };
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.userService.validateUser(email, password);
    if (user) {
      const response = {
        success: true,
        message: 'Login successful',
        data: user,
      };
      return response;
    } else {
      const response = {
        success: false,
        message: 'Invalid email or password',
        data: null,
      };
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const { email } = body;
    await this.userService.initiatePasswordReset(email);
    return {
      success: true,
      message:
        'Password reset initiated. Please check your email for instructions.',
      data: null,
    };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: { email: string; code: string; newPassword: string },
  ) {
    const { email, code, newPassword } = body;
    const success = await this.userService.resetPassword(
      email,
      code,
      newPassword,
    );
    if (success) {
      return {
        success: true,
        message:
          'Password reset successful. You can now login with your new password.',
        data: null,
      };
    } else {
      const response = {
        success: false,
        message: 'Invalid verification code.',
        data: null,
      };
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
  }
}
