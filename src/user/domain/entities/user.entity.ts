// import { RoleEntity } from 'src/role/domain/entities/role.entity';

export interface UserEntity {
  id?: string | number;
  name: string;
  email: string;
  password: string;
  image?: string;
  role: any;
}
