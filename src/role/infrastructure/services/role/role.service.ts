import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoleEntity } from 'src/role/domain/entities/role.entity';
import { RoleRepository } from 'src/role/domain/repositories/role.repository';
import { CreateRoleDto } from '../../dtos/createRole.dto';
import { Role } from '../../schemas/role.schema';

@Injectable()
export class RoleService implements RoleRepository {
  private static _instance: RoleService;
  @InjectModel(Role.name) private readonly roleModel: Model<Role>;

  public static getInstance(): RoleService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async getAllRoles(): Promise<RoleEntity[]> {
    try {
      const roles = await this.roleModel.find().exec();
      return roles;
    } catch (error) {
      throw new BadRequestException('Role not get');
    }
  }

  async getOneRole(roleId: string | number): Promise<RoleEntity> {
    try {
      const role = await this.roleModel.findById(roleId).exec();
      return role;
    } catch (error) {
      throw new NotFoundException('Role not found');
    }
  }

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    try {
      const newRole = new this.roleModel(role);
      return newRole.save();
    } catch (error) {
      throw new BadRequestException('Role not created');
    }
  }

  async updateRole(
    roleId: string | number,
    roleChanges: RoleEntity,
  ): Promise<RoleEntity> {
    try {
      const role = await this.roleModel
        .findByIdAndUpdate(
          roleId,
          {
            $set: roleChanges,
          },
          { new: true },
        )
        .exec();
      return role;
    } catch (error) {
      throw new NotFoundException('Role not update');
    }
  }

  async removeRole(roleId: string | number): Promise<RoleEntity> {
    try {
      return this.roleModel.findByIdAndRemove(roleId);
    } catch (error) {
      throw new NotFoundException('Role not remove');
    }
  }
}
