import { IsOptional, IsString } from 'class-validator';

// Define a data transfer object (DTO) for creating a new author
export class CreateAuthorDto {
  // The first name of the author, which must be a string
  @IsString()
  firstName: string;

  // The last name of the author, which must be a string
  @IsString()
  lastName: string;

  // The URL of the author's photo, which is optional and must be a string if provided
  @IsOptional()
  @IsString()
  photoUrl?: string;
}

// Define a DTO for updating an existing author
export class UpdateAuthorDto {
  // The first name of the author, which is optional and must be a string if provided
  @IsOptional()
  @IsString()
  firstName?: string;

  // The last name of the author, which is optional and must be a string if provided
  @IsOptional()
  @IsString()
  lastName?: string;

  // The URL of the author's photo, which is optional and must be a string if provided
  @IsOptional()
  @IsString()
  photoUrl?: string;
}
