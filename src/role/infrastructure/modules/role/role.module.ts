import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleUseCase } from 'src/role/application/use-cases/role.usecase';
import { RoleController } from '../../controller/role/role.controller';
import { Role, RoleSchema } from '../../schemas/role.schema';
import { RoleService } from '../../services/role/role.service';

console.log('role module: ', Role.name);

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleUseCase],
})
export class RoleModule {}
