'use client';
import { EditCategoryModal } from './components/EditCategoryModal';
import { CategoryWithObjectsDto } from '@/dtos/category.dto';
import { deleteCategory, findAllCategoriesWithObjects } from '@/services/axios';
import { MyAccordion } from '@/components/global-components';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

export const ManagementCategory = () => {
  const [categories, setCategories] = useState<CategoryWithObjectsDto[]>();

  const loadCategories = async () => {
    try {
      const categories: any = await findAllCategoriesWithObjects();
      if (categories.error) return toast.error(categories.message);

      const categoriesFormatted = categories.map((category: any) => {
        return {
          idCategory: category.idCategory,
          name: category.name,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          object:
            category.object.length > 0
              ? category.object.map((object: any) => {
                  return {
                    idObject: object.idObject,
                    name: object.name,
                    description: object.description,
                    objectPicture: object.Picture,
                    objectFile: object.File,
                    category: object.category,
                    subcategory: object.subcategory,
                    user: {
                      idUser: object.user.idUser,
                      name: object.user.person.name,
                    },
                    tag: object.tag,
                  };
                })
              : category.object,
        };
      });

      console.log(categoriesFormatted);

      setCategories(categoriesFormatted);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (category: CategoryWithObjectsDto) => {
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar a categoria '${category.name}'`,
      );

      if (confirm) {
        if (category.object.length > 0)
          return toast.error('Você não pode apagar categorias com objetos');
        const response = await deleteCategory(category.idCategory);
        if (response.error) return toast.error(response.message);

        toast.success(`Categoria '${category.name}' apagada com sucesso`);
        loadCategories();
      }
    } catch (err) {
      console.log('ERR: ' + err);
    }
  };

  if (categories) {
    return (
      <div className="flex flex-col justify-center items-center my-4 w-full">
        <h1 className="text-black font-bold text-xl mb-6">
          Gerenciamento de categorias
        </h1>
        {categories.map((category) => (
          <div className="w-3/4 md:2/4 mt-4">
            <MyAccordion
              title={category.name}
              summaryStyle={{ backgroundColor: '#333', color: 'white' }}
              titleClassName="font-bold break-all"
              detailClassName="bg-gray-100"
              expandedIconStyle={{ color: 'white' }}
            >
              <div className="text-black">
                <span className="text-black font-bold me-2">
                  Quantidade de objetos:
                </span>
                {category.object.length}
              </div>

              <div className="flex mt-4">
                <EditCategoryModal
                  category={category}
                  loadCategories={loadCategories}
                />
                <DeleteIcon color="error" />
              </div>

              {category.object.length > 0 && (
                <div>
                  <p className="text-black font-bold mt-5 mb-3">Objetos: </p>

                  {category.object.map((object) => {
                    return (
                      <div>
                        <MyAccordion
                          title={object.name}
                          titleClassName="text-black font-bold break-all"
                          summaryClassName="bg-gray-200 block"
                          detailClassName="bg-gray-100"
                        >
                          <p className="text-black break-all">
                            <span className="text-black font-bold ">
                              Proprietário:
                            </span>
                            {object.user.name}
                          </p>
                          <p className="text-black break-all">
                            <span className="text-black font-bold">
                              Descrição:
                            </span>
                            <span>{object.description}</span>
                          </p>

                          <p className="text-black break-all">
                            <span className="text-black font-bold">
                              Tipo de arquivo:
                            </span>
                            <span>{object.name}</span>
                          </p>

                          <div className="flex mt-4 ">
                            <span className="me-2 text-blue-500">Editar</span>
                            <span className="text-red-600">Apagar</span>
                          </div>
                        </MyAccordion>
                      </div>
                    );
                  })}
                </div>
              )}
            </MyAccordion>
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};
