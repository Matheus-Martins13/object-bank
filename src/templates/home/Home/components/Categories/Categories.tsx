'use client';

import { useEffect, useState } from 'react';
import { Category } from './components';
import { findAllCategoriesWithObjects } from '@/services/axios';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';

export const Categories = () => {
  const [categories, setCategories] =
    useState<CategoryWithSubcategoriesDto[]>();

  const loadCategories = async () => {
    const categories: CategoryWithSubcategoriesDto[] =
      await findAllCategoriesWithObjects();

    const categoriesFormatted: CategoryWithSubcategoriesDto[] =
      categories.filter((category) => category.subcategory.length > 0);

    setCategories(categoriesFormatted);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="w-11/12 sm:w-3/5 lg:w-2/4 lg:self-start lg:ms-10">
      {categories ? (
        categories?.map((cat) => (
          <div key={cat.idCategory}>
            <Category key={cat.idCategory} cat={cat} />
          </div>
        ))
      ) : (
        <div className="text-black">Carregando...</div>
      )}
    </div>
  );
};
