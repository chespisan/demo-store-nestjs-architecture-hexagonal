import { RoleEntity } from 'src/role/domain/entities/role.entity';

export interface RoleRepository {
  getAllRoles(): Promise<RoleEntity[]>;
  getOneRole(roleId: string | number): Promise<RoleEntity>;
  createRole(role: RoleEntity): Promise<RoleEntity>;
  updateRole(
    roleId: string | number,
    roleChanges: RoleEntity,
  ): Promise<RoleEntity>;
  removeRole(roleId: string | number): Promise<RoleEntity>;
}
