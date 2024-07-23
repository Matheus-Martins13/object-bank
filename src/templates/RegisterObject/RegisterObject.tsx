'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import {
  findAllCategories,
  findAllSubcategoriesInCategory,
  findAllTags,
  registerSubcategory,
} from '@/services/axios';

import { TagInterface } from '@/dtos/tag.dto';

import toast from 'react-hot-toast';


export const RegisterObject = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState<TagInterface[]>([]);
  const [subcategories, setSubcatecories] = useState([]);

  const [category, setCategory] = useState<string>();
  const [tag, setTag] = useState<string | undefined>();
  const [subcategory, setSubcategory] = useState();

  const loadCategories = async () => {
    const categoriesFound = await findAllCategories();
    setCategories(categoriesFound);
  };

  const loadTags = async () => {
    // const tagsFound = await findAllTags();
    const tagsFound = [
      {
        idTag: 'asdas',
        name: 'string',
        createdAt: '',
        updatedAt: '',
        object: '',
      },
      {
        idTag: 'string',
        name: 'cachorro',
        createdAt: '',
        updatedAt: '',
        object: '',
      },
    ];
    setTags(tagsFound);
  };

  const loadSubcategories = async (idCategory: string) => {
    const subcategoriesFound = await findAllSubcategoriesInCategory(idCategory);
    console.log(subcategoriesFound);
    setSubcatecories(subcategoriesFound);
  };

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const handleCategory = (event: any) => {
    setCategory(event.target.value);
    loadSubcategories(event.target.value);
  };

  const handleTag = (event: any) => {
    console.log(event.target.value);
    setTag(event.target.value);
  };

  const handleSubcategory = (event: any) => {
    setSubcategory(event.target.value);
  };

  const validTag = () => {
    if (tag) {
      if (!(tag in tags)) return true;
    } else return false;
    return false;
  };

  const handleSend = async (event: any) => {
    event.preventDefault();
    if (!category) {
      return toast.error('Você deve selecionar uma categoria para o objeto');
    }
    if (!subcategory) {
      return toast.error('Você deve selecionar uma subcategoria para o objeto');
    }

    try {
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
    <div id="register-category" className="bg-primary-1 min-h-screen">
      <form onSubmit={handleSend}>
        <div className="flex">
          {/* <Autocomplete
            freeSolo
            disableClearable
            id="combo-box-demo"
            options={tags.map((tag) => tag.name)}
            sx={{ width: 300 }}
            style={{ backgroundColor: 'red' }}
            renderInput={(params) => (
              <TextField
                onChange={handleTag}
                {...params}
                label="Tag"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          /> */}

          {validTag() && <button>Criar tag</button>}
        </div>

        <label htmlFor="">Escolha a categoria do objeto: </label>
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

        {category && (
          <div>
            <label htmlFor="">Escolha a subcategoria do objeto: </label>

            <select
              id="profile-type"
              className="w-full bg-black p-2"
              defaultValue={'DEFAULT'}
              onChange={handleCategory}
            >
              <option value="DEFAULT" disabled>
                Selecione a subcategoria do objeto
              </option>

              {subcategories ? (
                subcategories?.map((subcat: any) => (
                  <option key={subcat.idSubcategory} value={subcat.idCategory}>
                    {subcat.name}
                  </option>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </select>
          </div>
        )}

        <label htmlFor="">Tags do objeto: </label>
        <select
          id="profile-type"
          className="w-full bg-black p-2"
          defaultValue={'DEFAULT'}
          onChange={handleCategory}
        >
          <option value="DEFAULT" disabled>
            Selecione as tags do objeto
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
