"use client";

import { useEffect } from 'react';
import { Category } from './components';
import { findUserByEmail } from '@/services/axios';

export const Categories = () => {
  const categorias = [
    {
      idCategoria: 'hash1',
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
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
      ],
    },

    {
      idCategoria: 'hash2',
      name: 'Categoria 2',
      objects: [
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
      ],
    },
    {
      idCategoria: 'hash3',
      name: 'Categoria 3',
      objects: [
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
        {
          idObject: 'hjasj1',
          name: 'Objeto 1',
          description: 'Decrição do objeto 1',
          objectPicture: {
            name: 'nome1',
            path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
          },
          category: 'Categoria 1',
          subcategory: 'Subcategpria1',
          tags: [{ name: 'tag1' }],
        },
      ],
    },
  ];

  const findUser = async () => {
    const user = await findUserByEmail('');
  };

  useEffect(() => {

  }, []);

  return (
    <div className="w-11/12 sm:w-3/5 lg:w-2/4 lg:self-start lg:ms-10">
      {categorias.map((cat) => {
        return (
          <Category cat={cat}/>
        );
      })}
    </div>
  );
};
