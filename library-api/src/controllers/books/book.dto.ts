import { IsOptional, IsString } from 'class-validator';
import { AuthorModel } from 'library-api/src/models/author.model';

export class CreateBookDto {
  @IsString()
  author: AuthorModel;

  @IsString()
  name: string;

  @IsString()
  writtenOn: Date;

  @IsString()
  genres: string[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  author?: AuthorModel;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  writtenOn?: Date;

  @IsOptional()
  @IsString()
  genres?: string[];
}