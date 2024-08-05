import { ObjectDto } from "./object.dto";

export interface SubcategoryDto {
  idSubcategory: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  idCategory: string;
}

export interface SubcategoryWithObjectsDto {
  idSubcategory: string;
  name: string;
  object: ObjectDto[];
}
