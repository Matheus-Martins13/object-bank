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
  tags: { name: string; }[];
}
