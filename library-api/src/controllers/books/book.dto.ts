import { IsOptional, IsString } from 'class-validator';
import { PlainAuthorModel } from 'library-api/src/models/author.model';

export class CreateBookDto {
  @IsString()
  author: PlainAuthorModel;

  @IsString()
  name: string;

  @IsString()
  writtenOn: string;

  @IsString({ each: true })
  genres: string[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  author?: PlainAuthorModel;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  writtenOn?: string;

  @IsOptional()
  @IsString()
  genres?: string[];
}
