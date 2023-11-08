import { IsOptional, IsString } from 'class-validator';
import { AuthorModel } from 'library-api/src/models/author.model';
import { PlainGenreModel } from 'library-api/src/models/genre.model';

export class CreateBookDto {
  @IsString()
  author: AuthorModel;

  @IsString()
  name: string;

  @IsString()
  writtenOn: Date;

  @IsString()
  genres: PlainGenreModel;
}