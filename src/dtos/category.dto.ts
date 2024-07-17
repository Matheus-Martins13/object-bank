import { ObjectDto } from "./object.dto";

export interface CategoryDto {
  idCategoria: string;
  name: string;
  objects: ObjectDto[];
}
