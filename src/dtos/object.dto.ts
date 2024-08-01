import { CategoryDto } from './category.dto';
import { ObjectFileDto } from './object-file.dto';
import { ObjectPictureDto } from './object-picture.dto';
import { SubcategoryDto } from './subcategory.dto';
import { TagDbDto, TagDto } from './tag.dto';

export interface ObjectDto {
  idObject: string;
  name: string;
  description: string;
  objectPicture: ObjectPictureDto;
  objectFile: ObjectFileDto;
  category: CategoryDto;
  subcategory: SubcategoryDto;
  user: {
    idUser: string;
    name: string;
  };
  tag: TagDbDto[];
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
