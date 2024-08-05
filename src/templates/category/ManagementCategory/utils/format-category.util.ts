import { CategoryWithSubcategoriesDto, CategoryDto } from '@/dtos/category.dto';

export const formatCategory = (categories: CategoryWithSubcategoriesDto[]) => {
  return categories.map((category: any) => {
    return {
      idCategory: category.idCategory,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      subcategory:
        category.subcategory.length > 0
          ? category.subcategory.map((subcategory: any) => {
              return {
                idSubcategory: subcategory.idSubcategory,
                name: subcategory.name,
                object:
                  subcategory.object.length > 0
                    ? subcategory.object.map((object: any) => {
                        return {
                          idObject: object.idObject,
                          name: object.name,
                          category: object.category,
                          subcategory: object.subcategory,
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
                    : subcategory.object,
              };
            })
          : category.subcategory,
    };
  });
};
