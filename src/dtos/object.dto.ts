import { CategoryDto } from './category.dto';
import { SubcategoryDto } from './subcategory.dto';
import { TagDto } from './tag.dto';

export interface ObjectDto {
  idObject: string;
  name: string;
  description: string;
  objectPicture: {
    name: string;
    path: string;
  };
  user: {
    idUser: string;
    name: string;
  };
  category: string;
  subcategory: string;
  tags: { name: string }[];
}

export interface ObjectSendDto {
  name: string;
  description: string;
  category: CategoryDto | undefined;
  subcategory: SubcategoryDto | undefined;
  tags: TagDto[];
  thumb: File | undefined;
  objectFile: File | undefined;
  user: string;
}
