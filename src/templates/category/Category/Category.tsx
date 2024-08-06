'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import { findCategoryByIdComplet } from '@/services/axios';
import { SubcategoryWithObjectsDto } from '@/dtos/subcategory.dto';
import { ObjectDto } from '@/dtos/object.dto';
import './style.css';

export const Category = () => {
  const router = useRouter();
  const search = useSearchParams();
  const idCategory = search.get('idCategory');

  const [category, setCategory] = useState<CategoryWithSubcategoriesDto>();

  const getCategory = async () => {
    const response = await findCategoryByIdComplet(idCategory as string);

    if (!response) return router.push('/');

    if (response.error) {
      setTimeout(() => {
        window.alert('Ocorreu um erro');
      }, 3000);
      return router.push('/');
    }

    if (!response) return router.push('/');

    setCategory(response);
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (category) {
    return (
      <div className="w-full flex flex-col p-4">
        <h1 className="font-bold text-4xl mt-8 self-center">{category.name}</h1>

        {category.subcategory.map((subcategory: SubcategoryWithObjectsDto) => (
          <div className="flex flex-col items-center w-11/12 self-center">
            <h2 className="font-bold mt-5 text-2xl mb-4 self-start">
              {subcategory.name}
            </h2>
            <div className="flex w-full" id="subcategories-grid">
              {subcategory &&
                subcategory.object.map((obj: ObjectDto) => (
                  <>
                    <div key={obj.idObject} className="bg-black text-white p-4">
                      {obj.name}
                    </div>
                    <div key={obj.idObject} className="bg-black text-white p-4">
                      {obj.name}
                    </div>
                    <div key={obj.idObject} className="bg-black text-white p-4">
                      {obj.name}
                    </div>
                    <div key={obj.idObject} className="bg-black text-white p-4">
                      {obj.name}
                    </div>
                    <div key={obj.idObject} className="bg-black text-white p-4">
                      {obj.name}
                    </div>
                  </>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};
