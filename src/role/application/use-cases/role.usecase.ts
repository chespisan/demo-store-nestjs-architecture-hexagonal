import { RoleEntity } from 'src/role/domain/entities/role.entity';
import { RoleRepository } from 'src/role/domain/repositories/role.repository';

export class RoleUseCase implements RoleRepository {
  private static _instance: RoleUseCase;

  constructor(private readonly roleRepository: RoleRepository) {}

  public static getInstance(roleRepository): RoleUseCase {
    if (!this._instance) this._instance = new this(roleRepository);
    return this._instance;
  }

  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleRepository.getAllRoles();
  }

  getOneRole(roleId: string | number): Promise<RoleEntity> {
    return this.roleRepository.getOneRole(roleId);
  }

  createRole(role: RoleEntity): Promise<RoleEntity> {
    return this.roleRepository.createRole(role);
  }

  updateRole(
    roleId: string | number,
    roleChanges: RoleEntity,
  ): Promise<RoleEntity> {
    return this.roleRepository.updateRole(roleId, roleChanges);
  }

  removeRole(roleId: string | number): Promise<RoleEntity> {
    return this.roleRepository.removeRole(roleId);
  }
}
