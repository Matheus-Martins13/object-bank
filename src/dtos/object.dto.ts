export interface ObjectDto {
  idObject: string;
  name: string;
  description: string;
  user: {
    idUser: string;
    name: string;
  };
  objectPicture: {
    name: string;
    path: string;
  };
  category: string;
  subcategory: string;
  tags: { name: string; }[];
}
