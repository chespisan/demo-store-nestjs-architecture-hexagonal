import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/config/module-mongo/database.module';
import { ProductModule } from 'src/product/infrastructure/modules/product.module';
import { CategoryModule } from 'src/category/infrastructure/modules/category/category.module';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/infrastructure/modules/role/role.module';
import { UserModule } from './user/infrastructure/module/user/user.module';
import { UserController } from './user/infrastructure/controller/user/user.controller';
import { UserService } from './user/infrastructure/services/user/user.service';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    ProductModule,
    CategoryModule,
    RoleModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
