/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable prettier/prettier */

import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    photoUrl?: string;
}

export class UpdateAuthorDto {

    @IsOptional()
    @IsString()
    firstName?: string;
    
    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    photoUrl?: string;

}
