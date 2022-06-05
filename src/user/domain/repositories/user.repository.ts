import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  getAllUsers(): Promise<UserEntity[]>;
  getOneUser(userId: string | number): Promise<UserEntity>;
  getOneUserByEmail(email: string): Promise<UserEntity>;
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(
    userId: string | number,
    userChanges: UserEntity,
  ): Promise<UserEntity>;
  removeUser(userId: string): Promise<UserEntity>;
}
