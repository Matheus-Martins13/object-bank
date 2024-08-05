import { ObjectDto } from './object.dto';

export interface CategoryDto {
  idCategory: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface CategoryWithSubcategoriesDto {
  idCategory: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subcategory: {
    idSubcategory: string;
    name: string;
    object: ObjectDto[];
  }[];
}
