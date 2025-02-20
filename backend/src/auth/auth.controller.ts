import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Res,
  Req,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() registerDto: RegisterDto,
  ) {
    if (registerDto.code !== 'lah6Faeshog3aita') {
      throw new NotFoundException('Code not found');
    }

    const { user, accessToken, refreshToken } = await this.userService.register(
      registerDto.email,
      registerDto.password,
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return user;
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    console.log(loginDto, 'loginDto');
    const { user, accessToken, refreshToken } = await this.userService.login(
      loginDto.email,
      loginDto.password,
    );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return user;
  }

  @Get('info')
  async validateUser(@Req() req: any) {
    const user = await this.userService.validateUser(req?.userId);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: RefreshDto,
  ) {
    const { user, accessToken, refreshToken } =
      await this.userService.refreshTokens(payload.refreshToken);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return user;
  }

  @Get('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.cookie('Authentication', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });
    res.cookie('Refresh', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });

    res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }
}
