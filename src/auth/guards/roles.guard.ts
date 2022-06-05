import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { PayloadToken } from '../interfaces/payloadToken.interface';

// Guard para validar que el role que llame al recurso sea el correcto
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RoleEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role.type);
    if (!isAuth) {
      throw new ForbiddenException('Is role not valid');
    }
    return true;
  }
}
