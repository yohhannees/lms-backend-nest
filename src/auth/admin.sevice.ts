/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
email: string;
  id: number;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
    private emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(
    fullname: string,
    email: string,
    password: string,
  ): Promise<Admin> {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { email },
    });
    if (existingAdmin) {
      const response = {
        success: false,
        message: 'Admin already exists.',
        data: null,
      };
      throw new BadRequestException(response);
    }
    const admin = new Admin();
    admin.fullname = fullname;
    admin.email = email;
    admin.password = password;
    admin.verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    admin.isVerified = false;
    return await this.adminsRepository.save(admin);
  }

  async findByEmail(email: string): Promise<Admin> {
    return await this.adminsRepository.findOne({ where: { email } });
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const admin = await this.adminsRepository.findOne({ where: { email } });
    if (admin && admin.verificationCode === code) {
      admin.isVerified = true;
      await this.adminsRepository.save(admin);
      return true;
    }
    return false;
  }

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({
      where: { email, password },
    });
    if (admin && admin.isVerified) {
      return admin;
    }
    return null;
  }

  async sendVerificationEmail(to: string, code: string) {
    await this.emailService.sendVerificationEmail(to, code);
  }

  async initiatePasswordReset(email: string): Promise<void> {
    const admin = await this.findByEmail(email);
    if (admin) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      admin.verificationCode = code;
      await this.adminsRepository.save(admin);
      await this.emailService.sendPasswordResetEmail(email, code);
    } else {
      const response = {
        success: false,
        message: 'Admin not found.',
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
    const admin = await this.findByEmail(email);
    if (admin && admin.verificationCode === code) {
      admin.password = newPassword;
      admin.verificationCode = null;
      await this.adminsRepository.save(admin);
      return true;
    }
    throw new BadRequestException('Invalid verification code.');
  }

  async generateToken(admin: Admin): Promise<string> {
    const payload: JwtPayload = { email: admin.email, id: admin.id };
    return this.jwtService.sign(payload, { secret: '1234567' });
  }

  async validateToken(token: string): Promise<Admin> {
    try {
      const payload: JwtPayload = this.jwtService.verify(token,{ secret: '1234567' });
      const admin = await this.adminsRepository.findOne({
        where: { email: payload.email, id: payload.id },
      });
      if (!admin) {
        throw new Error('Admin not found.');
      }
      return admin;
    } catch (error) {
      return null;
    }
  }
}