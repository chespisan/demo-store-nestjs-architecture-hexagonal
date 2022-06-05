import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleUseCase } from 'src/role/application/use-cases/role.usecase';
import { RoleEntity } from 'src/role/domain/entities/role.entity';
import { RoleRepository } from 'src/role/domain/repositories/role.repository';
import { RoleService } from '../../services/role/role.service';

@Controller('roles')
export class RoleController implements RoleRepository {
  constructor(
    private readonly roleUseCase: RoleUseCase,
    private readonly roleService: RoleService,
  ) {
    this.roleUseCase = RoleUseCase.getInstance(roleService);
  }

  @Get()
  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleUseCase.getAllRoles();
  }

  @Get(':roleId')
  getOneRole(@Param('roleId') roleId: string | number): Promise<RoleEntity> {
    return this.roleUseCase.getOneRole(roleId);
  }

  @Post()
  createRole(@Body() role: RoleEntity): Promise<RoleEntity> {
    return this.roleUseCase.createRole(role);
  }

  @Put(':roleId')
  updateRole(
    @Param('roleId') roleId: string | number,
    @Body() roleChanges: RoleEntity,
  ): Promise<RoleEntity> {
    return this.roleUseCase.updateRole(roleId, roleChanges);
  }

  @Delete(':roleId')
  removeRole(@Param('roleId') roleId: string | number): Promise<RoleEntity> {
    return this.roleUseCase.removeRole(roleId);
  }
}
