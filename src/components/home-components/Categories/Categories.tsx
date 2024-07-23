'use client';

import { useEffect } from 'react';
import { Category } from './components';

export const Categories = () => {
  const categorias = [
    {
      idCategory: 'hash1',
      name: 'Categoria 1',
      objects: [
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          user: {
            idUser: '',
            name: '',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
      ],
    },
  ];

  useEffect(() => {}, []);

  return (
    <div className="w-11/12 sm:w-3/5 lg:w-2/4 lg:self-start lg:ms-10">
      {categorias.map((cat) => {
        return <div key={cat.idCategory}>
          <Category cat={cat}/>;
        </div>;
      })}
    </div>
  );
};
