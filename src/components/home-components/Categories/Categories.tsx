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
      console.log(categories);
    setCategories(categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="w-11/12 sm:w-3/5 lg:w-2/4 lg:self-start lg:ms-10">
      {categories?.map((cat) => (
        <div key={cat.idCategory} className="text-black">
          <Category key={cat.idCategory} cat={cat}/>
        </div>
      ))}
    </div>
  );
};
