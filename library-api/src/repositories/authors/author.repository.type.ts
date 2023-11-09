import { PlainAuthorModel, UpdateAuthorModel } from 'library-api/src/models';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type CreateAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;
export type UpdateAuthorRepositoryInput = UpdateAuthorModel;
