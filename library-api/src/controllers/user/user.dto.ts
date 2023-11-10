import { IsString } from 'class-validator';

// Define a data transfer object (DTO) for creating a new user
export class CreateUserDto {
  // The first name of the user, which must be a string
  @IsString()
  firstname: string;

  // The last name of the user, which must be a string
  @IsString()
  lastname: string;
}
