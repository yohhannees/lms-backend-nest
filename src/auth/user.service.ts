/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { randomBytes } from 'crypto';
import { EmailService } from './email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createUser(
    fullname: string,
    email: string,
    password: string,
  ): Promise<User> {
    const ExisitingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (ExisitingUser) {
      const response = {
        success: false,
        message: 'User already exists.',
        data: null,
      };
      throw new BadRequestException(response);
    }
    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.password = password;
    user.verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.isVerified = false;
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && user.verificationCode === code) {
      user.isVerified = true;
      await this.usersRepository.save(user);
      return true;
    }
    return false;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email, password },
    });
    if (user && user.isVerified) {
      return user;
    }
    return null;
  }

  async sendVerificationEmail(to: string, code: string) {
    await this.emailService.sendVerificationEmail(to, code);
  }

  async initiatePasswordReset(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      user.verificationCode = code;
      await this.usersRepository.save(user);
      await this.emailService.sendPasswordResetEmail(email, code);
    } else {
      const response = {
        success: false,
        message: 'User not found.',
        data: null,
      };
      throw new BadRequestException(response);
    }
  }

  async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (user && user.verificationCode === code) {
      user.password = newPassword;
      user.verificationCode = null;
      await this.usersRepository.save(user);
      return true;
    }
    throw new BadRequestException('Invalid verification code.');
  }
}
