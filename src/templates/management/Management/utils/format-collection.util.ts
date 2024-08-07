import { CollectionWithObjectsDto } from '@/dtos/collection.dto';

export const formatCollection = (collections: CollectionWithObjectsDto[]) => {
  return collections.map((collection: any) => {
    return {
      idCollection: collection.idCollection,
      name: collection.name,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
      object:
        collection.object.length > 0
          ? collection.object.map((object: any) => {
              return {
                idObject: object.idObject,
                name: object.name,
                collection: object.collection,
                description: object.description,
                objectPicture: object.objectPicture,
                objectFile: object.objectFile,
                user: {
                  idUser: object.user.idUser,
                  name: object.user.person.name,
                },
                tag: object.tag,
              };
            })
          : collection.object,
    };
  });
};
