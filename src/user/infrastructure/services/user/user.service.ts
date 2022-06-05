import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { User } from '../../schemas/user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserRepository {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userModel.find().populate('role').exec();
      return users;
    } catch (error) {
      throw new BadRequestException('User not Get');
    }
  }

  async getOneUser(userId: string | number): Promise<UserEntity> {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user;
    } catch (error) {
      throw new NotFoundException('UserID not found');
    }
  }

  async getOneUserByEmail(email: string): Promise<any> {
    try {
      const user = await this.userModel
        .findOne({ email })
        .populate('role')
        .exec();
      return user;
    } catch (error) {
      throw new NotFoundException('User Email not found');
    }
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      const newUser = new this.userModel(user);
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;
      return newUser.save();
    } catch (error) {
      throw new BadRequestException('User not created');
    }
  }

  async updateUser(
    userId: string | number,
    userChanges: UserEntity,
  ): Promise<UserEntity> {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(
          userId,
          {
            $set: userChanges,
          },
          { new: true },
        )
        .exec();
      return user;
    } catch (error) {
      throw new BadRequestException('User not updated');
    }
  }

  async removeUser(userId: string): Promise<UserEntity> {
    try {
      return await this.userModel.findByIdAndRemove(userId);
    } catch (error) {
      throw new BadRequestException('User not remove');
    }
  }
}
