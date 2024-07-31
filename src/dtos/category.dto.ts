import { ObjectDto } from "./object.dto";

export interface CategoryDto {
  idCategory: string;
  name: string;
  objects: ObjectDto[];
}

export interface CategoryWithObjectsDto {
  idCategory: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  object: []
}

