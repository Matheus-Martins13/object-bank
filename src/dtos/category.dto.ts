import { ObjectDto } from "./object.dto";

export interface CategoryDto {
  idCategory: string;
  name: string;
  objects: ObjectDto[];
}
