import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/infrastructure/services/user/user.service';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { PayloadToken } from '../interfaces/payloadToken.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getOneUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: UserEntity) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
