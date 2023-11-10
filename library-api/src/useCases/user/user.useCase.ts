// Import necessary modules and types
import { Injectable } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { UserRepository } from 'library-api/src/repositories';
import {
  UserUseCasesOutput,
  PlainUserUseCasesOutput,
  CreateUserUseCasesInput,
} from 'library-api/src/useCases/user/user.useCase.type';

// Define UserUseCases class that is Injectable (can be injected as a dependency)
@Injectable()
export class UserUseCases {
  // Constructor that takes a UserRepository as a dependency
  constructor(private readonly userRepository: UserRepository) {}

  public async getAllPlain(): Promise<PlainUserUseCasesOutput[]> {
    // Call the getAllPlain method of the userRepository and return the result
    return this.userRepository.getAllPlain();
  }

  public async getById(id: UserId): Promise<UserUseCasesOutput> {
    // Call the getById method of the userRepository with the given id and return the result
    return this.userRepository.getById(id);
  }

  public async create(
    input: CreateUserUseCasesInput,
  ): Promise<PlainUserUseCasesOutput> {
    // Call the createUser method of the userRepository with the given input and return the result
    return this.userRepository.createUser(input);
  }

  public async deleteById(id: UserId): Promise<void> {
    // Get the user by id
    const user = await this.getById(id);
    // Call the deleteById method of the userRepository with the user's id
    await this.userRepository.deleteById(user.id);
  }
}
