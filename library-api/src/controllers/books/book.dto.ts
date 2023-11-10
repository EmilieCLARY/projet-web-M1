import { IsOptional, IsString } from 'class-validator';
import { PlainAuthorModel } from 'library-api/src/models/author.model';

// Define a data transfer object (DTO) for creating a new book
export class CreateBookDto {
  // The author of the book, which must be a PlainAuthorModel
  @IsString()
  author: PlainAuthorModel;

  // The name of the book, which must be a string
  @IsString()
  name: string;

  // The date the book was written on, which must be a string
  @IsString()
  writtenOn: string;

  // The genres of the book, which must be an array of strings
  @IsString({ each: true })
  genres: string[];
}

// Define a data transfer object (DTO) for updating an existing book
export class UpdateBookDto {
  // The author of the book, which is optional and must be a PlainAuthorModel if provided
  @IsOptional()
  @IsString()
  author?: PlainAuthorModel;

  // The name of the book, which is optional and must be a string if provided
  @IsOptional()
  @IsString()
  name?: string;

  // The date the book was written on, which is optional and must be a string if provided
  @IsOptional()
  @IsString()
  writtenOn?: string;

  // The genres of the book, which are optional and must be an array of strings if provided
  @IsOptional()
  @IsString()
  genres?: string[];
}
