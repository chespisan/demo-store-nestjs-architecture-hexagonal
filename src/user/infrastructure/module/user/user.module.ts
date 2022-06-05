import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserUseCase } from 'src/user/application/use-cases/user.usecase';
import { UserController } from '../../controller/user/user.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserService } from '../../services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserUseCase],
  exports: [UserService],
})
export class UserModule {}
