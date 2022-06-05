import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserUseCase } from 'src/user/application/use-cases/user.usecase';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { UserService } from '../../services/user/user.service';

@Controller('users')
export class UserController implements UserRepository {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userService: UserService,
  ) {
    this.userUseCase = new UserUseCase(userService);
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userUseCase.getAllUsers();
  }

  @Get(':userId')
  getOneUser(@Param('userId') userId: string | number): Promise<UserEntity> {
    return this.userUseCase.getOneUser(userId);
  }

  @Get(':email')
  getOneUserByEmail(@Param('email') email: string): Promise<UserEntity> {
    return this.userUseCase.getOneUserByEmail(email);
  }

  @Post()
  createUser(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userUseCase.createUser(user);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string | number,
    @Body() userChanges: UserEntity,
  ): Promise<UserEntity> {
    return this.userUseCase.updateUser(userId, userChanges);
  }

  @Delete(':userId')
  removeUser(@Param('userId') userId: string): Promise<UserEntity> {
    return this.userUseCase.removeUser(userId);
  }
}
