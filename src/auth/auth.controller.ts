/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { fullname: string, email: string, password: string }) {
    const { fullname, email, password } = body;
    const user = await this.userService.createUser(fullname, email, password);
    await this.userService.sendVerificationEmail(user.email, user.verificationCode);
    return { message: 'User registered. Please check your email for verification.' };
  }

  @Post('verify')
  async verifyEmail(@Body() body: { email: string, code: string }) {
    const { email, code } = body;
    const verified = await this.userService.verifyEmail(email, code);
    if (verified) {
      return { message: 'Email verified successfully.' };
    } else {
      return { message: 'Invalid verification code.' };
    }
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    const user = await this.userService.validateUser(email, password);
    if (user) {
      return { message: 'Login successful', user };
    } else {
      return { message: 'Invalid email or password' };
    }
  }
}
