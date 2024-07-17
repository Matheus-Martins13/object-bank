export interface ObjectDto {
  idObject: string;
  name: string;
  description: string;
  objectPicture: {
    name: string;
    path: string;
  };
  category: string;
  subcategory: string;
  tags: { name: string; }[];
}
