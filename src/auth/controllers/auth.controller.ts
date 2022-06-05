import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserEntity } from 'src/user/domain/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as UserEntity;
    return this.authService.generateJWT(user);
  }
}
