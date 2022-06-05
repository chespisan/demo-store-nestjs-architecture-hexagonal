import { RoleEntity } from 'src/role/domain/entities/role.entity';

export interface PayloadToken {
  role: any;
  sub: string | number;
}
