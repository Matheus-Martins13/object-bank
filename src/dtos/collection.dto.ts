import { ObjectDto } from './object.dto';

export interface CollectionDto {
  idCollection: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface CollectionWithObjectsDto {
  idCollection: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  object: ObjectDto[];
}
