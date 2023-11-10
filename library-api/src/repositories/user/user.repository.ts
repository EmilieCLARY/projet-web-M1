// Import necessary modules and types
import { Injectable } from '@nestjs/common';
import {
  NotFoundError,
  InternalServerError,
} from 'library-api/src/common/errors';
import { User, UserId } from 'library-api/src/entities';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
  CreateUserRepositoryInput,
} from 'library-api/src/repositories/user/user.repository.type';
import {
  adaptUserEntityToUserModel,
  adaptUserEntityToPlainUserModel,
} from 'library-api/src/repositories/user/user.utils';
import { DataSource, Repository } from 'typeorm';

// Define UserRepository class that extends the Repository class from TypeORM
@Injectable()
export class UserRepository extends Repository<User> {
  // Constructor that takes a DataSource and creates an EntityManager
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Get all plain users
   * @returns Array of plain users
   */
  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    // Find all users
    const users = await this.find({});

    // Map each user to a plain user model
    return users.map(adaptUserEntityToPlainUserModel);
  }

  /**
   * Get a user by its ID
   * @param id user's ID
   * @returns user if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    // Find one user with the given ID
    const user = await this.findOne({ where: { id } });

    // If no user is found, throw a NotFoundError
    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    // Adapt the user entity to a user model and return it
    return adaptUserEntityToUserModel(user);
  }

  /**
   * Create a new user
   * @param input Data to create the new user
   * @returns Created user
   */
  public async createUser(
    input: CreateUserRepositoryInput,
  ): Promise<PlainUserRepositoryOutput> {
    // Start a new transaction
    const id = await this.dataSource.transaction(async (manager) => {
      // Create and save a new user
      const [newUser] = await manager.save<User>([
        manager.create<User>(User, { ...input }),
      ]);

      // If no user is created, throw an InternalServerError
      if (!newUser) {
        throw new InternalServerError('An error occured creating new user');
      }

      // Return the ID of the new user
      return newUser.id;
    });

    // Get and return the new user by its ID
    return this.getById(id);
  }

  /**
   * Delete a user by its ID
   * @param id user's ID
   * @throws 404: user with this ID was not found
   */
  public async deleteById(id: UserId): Promise<void> {
    // Delete the user with the given ID
    await this.delete(id);
  }
}
