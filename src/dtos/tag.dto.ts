export interface TagDto {
  value: string;
  label: string;
  idTag?: string;
}

export interface TagDbDto {
  idTag: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
