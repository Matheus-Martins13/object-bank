'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import { findAllCategories, registerSubcategory } from '@/services/axios';
import toast from 'react-hot-toast';

export const RegisterSubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState<string>('');

  const loadCategories = async () => {
    const categoriesFound = await findAllCategories();
    setCategories(categoriesFound);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSubcategory = (event: ChangeEvent<HTMLInputElement>) => {
    setSubcategory(event.target.value);
  };

  const handleSend = async (event: any) => {
    event.preventDefault();
    if (!category) {
      return toast.error('Você deve selecionar uma categoria pai');
    }
    if (!subcategory) {
      return toast.error('O nome da subcategoria é obrigatório');
    }

    try {
      console.log(subcategory, category);
      const response = await registerSubcategory(subcategory, category);

      if (response.error) return toast.error(response.message);
      return toast.success(
        `Subcategoria '${subcategory}' cadastrada com sucesso`,
      );
    } catch (err) {
      console.log('ERROR:' + err);
    }
  };

  return (
    <div
      id="register-category"
      className="bg-primary-1 min-h-screen flex flex-col items-center justify-center"
    >
      <form onSubmit={handleSend}>
        <label htmlFor="">Escolha a categoria pai: </label>

        <select
          id="profile-type"
          className="w-full bg-black p-2"
          defaultValue={'DEFAULT'}
          onChange={handleCategory}
        >
          <option value="DEFAULT" disabled>
            Selecione a categoria pai
          </option>

          {categories ? (
            categories?.map((cat: any) => (
              <option key={cat.idCategory} value={cat.idCategory}>
                {cat.name}
              </option>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </select>

        <label htmlFor="subcategory-input-name" className="block">
          Nome da subcategoria:
        </label>
        <input
          type="text"
          name=""
          id="subcategory-input-name"
          value={subcategory}
          onChange={handleSubcategory}
          placeholder="Nome da subcategoria"
          style={{ backgroundColor: 'black' }}
        />

        <input type="submit" placeholder="send" />
      </form>
    </div>
  );
};
