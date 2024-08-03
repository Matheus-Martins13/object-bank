'use client';
import { Modal } from '@/components/management-category-components';
import { CategoryDto, CategoryWithObjectsDto } from '@/dtos/category.dto';
import { deleteCategory, findAllCategoriesWithObjects } from '@/services/axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const ManagementSubcategory = () => {
  const [categories, setCategories] = useState<CategoryWithObjectsDto[]>();

  const loadCategories = async () => {
    const categories: CategoryWithObjectsDto[] =
      await findAllCategoriesWithObjects();

    const categoriesFormatted: CategoryWithObjectsDto[] = categories.filter(
      (category) => category.object.length > 0,
    );

    setCategories(categoriesFormatted);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (category: CategoryDto) => {
    try {
      const confirm = window.confirm(
        `Você tem certeza que deseja apagar a categoria '${category.name}'`,
      );

      if (confirm) {
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
      <div className="flex flex-col justify-center items-center my-4">
        <h1 className="text-black font-bold text-xl">
          Gerenciamento de subcategorias
        </h1>
        {categories.map((category) => (
          <div
            key={category.idCategory}
            className="p-4 bg-gray-300 w-2/3 sm:w-2/4 my-2 flex justify-between"
          >
            <p className="text-black">{category.name}</p>
            <div className="flex">
              <Modal
                textButton="Editar"
                category={category}
                loadCategories={loadCategories}
              />
              <button onClick={() => handleDelete(category)}>Apagar</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};
