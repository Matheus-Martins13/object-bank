import { CollectionDto } from './collection.dto';
import { ObjectFileDto } from './object-file.dto';
import { ObjectPictureDto } from './object-picture.dto';
import { TagDbDto, TagDto } from './tag.dto';

export interface ObjectDto {
  idObject: string;
  name: string;
  description: string;
  objectPicture: ObjectPictureDto;
  objectFile: ObjectFileDto;
  collection: CollectionDto;
  type?: string;
  user: {
    idUser: string;
    name: string;
  };
  tag: TagDbDto[];
}

export interface ObjectSendDto {
  name: string;
  description: string;
  collection: CollectionDto | undefined;
  tags: TagDto[];
  thumb: File | undefined;
  objectFile: File | undefined;
  user: string;
}
