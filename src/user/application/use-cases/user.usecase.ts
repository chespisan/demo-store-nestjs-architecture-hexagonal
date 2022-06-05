import { UserEntity } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

export class UserUseCase implements UserRepository {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAllUsers();
  }

  getOneUser(userId: string | number): Promise<UserEntity> {
    return this.userRepository.getOneUser(userId);
  }

  getOneUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.getOneUserByEmail(email);
  }

  createUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.createUser(user);
  }

  updateUser(
    userId: string | number,
    userChanges: UserEntity,
  ): Promise<UserEntity> {
    return this.userRepository.updateUser(userId, userChanges);
  }

  removeUser(userId: string): Promise<UserEntity> {
    return this.userRepository.removeUser(userId);
  }
}
