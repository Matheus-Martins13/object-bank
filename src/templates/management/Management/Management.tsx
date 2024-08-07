'use client';

import { useState, useEffect } from 'react';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import { findAllCategoriesWithObjects } from '@/services/axios';
import { formatCategory } from './utils/format-category.util';
import { CategoryAccordion } from './components';
import toast from 'react-hot-toast';

export const Management = () => {
  const [categories, setCategories] =
    useState<CategoryWithSubcategoriesDto[]>();
  const [textFilter, setTextFilter] = useState<string>('');

  const loadCategories = async () => {
    try {
      const categories: any = await findAllCategoriesWithObjects();
      if (categories.error) return toast.error(categories.message);

      const categoriesFormatted = formatCategory(categories);

      if (textFilter) {
        const textFilterLowerCase = textFilter.toLowerCase();

        const categoriesWithFilter = categories.filter(
          (category: CategoryWithSubcategoriesDto) => {
            if (category.name.toLowerCase().includes(textFilterLowerCase))
              return category;

            for (const subcategory of category.subcategory) {
              if (subcategory.name.toLowerCase().includes(textFilterLowerCase))
                return category;

              for (const object of subcategory.object) {
                if (object.name.toLowerCase().includes(textFilterLowerCase))
                  return category;
                if (
                  object.description.toLowerCase().includes(textFilterLowerCase)
                )
                  return category;
              }
            }
          },
        );
        return setCategories(categoriesWithFilter);
      }
      setCategories(categoriesFormatted);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [textFilter]);

  const handleFilter = (event: any) => {
    setTextFilter(event.target.value);
  };

  if (categories) {
    return (
      <div className="flex flex-col justify-center items-center my-4 w-full">
        <h1 className="text-black font-bold text-xl mb-6">
          Gerenciamento de categorias
        </h1>

        <div className="w-2/4">
          <input
            type="text"
            className="p-2 border-2 border-gray-800 w-full"
            placeholder="Buscar"
            onChange={handleFilter}
          />
        </div>

        {categories.map((category) => (
          <div className="w-3/4 md:2/4 mt-4" key={category.idCategory}>
            <CategoryAccordion
              category={category}
              loadCategories={loadCategories}
              key={category.idCategory}
              categories={categories}
            />
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};
