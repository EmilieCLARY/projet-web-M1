import { IsString } from 'class-validator';

// Define a data transfer object (DTO) for creating a new genre
export class CreateGenreDto {
  // The name of the genre, which must be a string
  @IsString()
  name: string;
}
