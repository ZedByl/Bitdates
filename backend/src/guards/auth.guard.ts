import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../app/app.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @Inject(AppService) private appService: AppService,
  ) {}

  use(req: any, res: any, next: () => void) {
    const token = req?.cookies?.Authentication;
    const refreshToken = req.cookies?.Refresh;

    if (!token) {
      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }

      try {
        const env = this.appService.getEnv();
        const refreshPayload = this.jwtService.verify(refreshToken, {
          secret: this.appService.getJwtSecretRefresh(),
        });

        const newAccessToken = this.jwtService.sign(
          { id: refreshPayload.id },
          {
            secret: this.appService.getJwtSecret(),
            expiresIn: '15m',
          },
        );

        res.cookie('Authentication', newAccessToken, {
          httpOnly: true,
          secure: env === 'prod',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000,
        });

        req.userId = refreshPayload.id;
        return next();
      } catch (refreshErr) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }

    try {
      const user = this.jwtService.verify(token, {
        secret: this.appService.getJwtSecret(),
      });

      req.userId = user.id;

      return next();
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
