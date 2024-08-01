'use client';

import { useEffect, useState } from 'react';
import { Category } from './components';
import { findAllCategoriesWithObjects } from '@/services/axios';
import { CategoryWithObjectsDto } from '@/dtos/category.dto';

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryWithObjectsDto[]>();

  const loadCategories = async () => {
    console.log('teste');

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

  return (
    <div className="w-11/12 sm:w-3/5 lg:w-2/4 lg:self-start lg:ms-10">
      {categories ? (
        categories.length > 0 ? (
          categories?.map((cat) => (
            <div key={cat.idCategory}>
              <Category key={cat.idCategory} cat={cat} />
            </div>
          ))
        ) : (
          <div className="text-black">Nenhum objeto encontrado</div>
        )
      ) : (
        <div className="text-black">Carregando...</div>
      )}
    </div>
  );
};
