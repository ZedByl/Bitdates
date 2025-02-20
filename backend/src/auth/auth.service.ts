import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../db/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  generateTokens(user: User) {
    const accessPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: process.env.JWT_SECRET || 'ACCESS_SECRET',
      expiresIn: '15m',
    });

    const refreshPayload = {
      id: user.id,
      email: user.email,
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_SECRET_REFRESH || 'REFRESH_SECRET',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      roles: ['user'],
    });

    await this.userRepository.save(newUser);

    const { accessToken, refreshToken } = this.generateTokens(newUser);

    newUser.refreshToken = refreshToken;
    await this.userRepository.save(newUser);

    delete newUser.password;

    return { user: newUser, accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    delete user.password;

    return { user, accessToken, refreshToken };
  }

  async validateUser(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user.password) delete user.password;

    return user;
  }

  async refreshTokens(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    try {
      const payload = this.jwtService.verify(oldRefreshToken, {
        secret: process.env.JWT_SECRET_REFRESH || 'REFRESH_SECRET',
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.refreshToken !== oldRefreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { accessToken, refreshToken } = this.generateTokens(user);

      user.refreshToken = refreshToken;
      await this.userRepository.save(user);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
