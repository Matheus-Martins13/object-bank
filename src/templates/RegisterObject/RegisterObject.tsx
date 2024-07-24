'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import {
  findAllCategories,
  findAllSubcategoriesInCategory,
  findAllTags,
  registerSubcategory,
} from '@/services/axios';
import { Multiselect } from '@/components/register-object-components/Multiselect';

import { TagInterface } from '@/dtos/tag.dto';

import toast from 'react-hot-toast';

export const RegisterObject = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState<TagInterface[]>([]);
  const [subcategories, setSubcatecories] = useState([]);

  const [objectName, setObjectName] = useState('');
  const [objectDescription, setObjectDescription] = useState('');
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const [tag, setTag] = useState();

  const [thumb, setThumb] = useState();
  const [objectFile, setObjectFile] = useState();

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
    setSubcatecories(subcategoriesFound);
  };

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const handleObjectName = (event: any) => {
    setObjectName(event.target.value);
  };

  const handleObjectDescription = (event: any) => {
    setObjectDescription(event.target.value);
  };

  const handleCategory = (event: any) => {
    setCategory(event.target.value);
    loadSubcategories(event.target.value);
  };

  const handleSubcategory = (event: any) => {
    setSubcategory(event.target.value);
  };

  const handleTag = (event: any) => {
    setTag(event.target.value);
  };

  const handleThumb = (event: any) => {
    setThumb(event.target.file);
  };

  const handleObjectFile = (event: any) => {
    setObjectFile(event.target.file);
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
    <div
      id="register-category"
      className="min-h-screen flex items-center justify-center flex-col"
    >
      <form onSubmit={handleSend}>
        {/* --------------- */}
        <label htmlFor="object-name" className="text-black">
          Nome do objeto
        </label>
        <input
          placeholder="Nome do objeto"
          type="text"
          name="object-name"
          id="object-name"
          value={objectName}
          onChange={handleObjectName}
          className="w-full bg-black p-2"
        />
        {/* --------------- */}

        {/* --------------- */}
        <label htmlFor="object-description" className="text-black">
          Descrição do objeto
        </label>
        <textarea
          placeholder="Descrição do objeto"
          name="object-description"
          id="object-description"
          value={objectDescription}
          onChange={handleObjectDescription}
          className="w-full bg-black p-2"
        />
        {/* --------------- */}

        {/* --------------- */}
        <label htmlFor="category-object" className="text-black">
          Escolha a categoria do objeto:
        </label>

        <select
          id="category-object"
          className="w-full bg-black p-2"
          defaultValue={'DEFAULT'}
          onChange={handleCategory}
        >
          <option value="DEFAULT" disabled>
            Selecione a categoria do objeto
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
        {/* --------------- */}

        {/* --------------- */}
        {category && (
          <div>
            <label htmlFor="object-subcategory" className="text-black">
              Escolha a subcategoria do objeto:
            </label>

            <select
              id="object-subcategory"
              className="w-full bg-black p-2"
              defaultValue={'DEFAULT'}
              onChange={handleSubcategory}
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
        {/* --------------- */}

        {/* --------------- */}
        <label htmlFor="" className="text-black mt-6">
          Tags:{' '}
        </label>
        <Multiselect tags={tags} />
        {/* --------------- */}

        {/* --------------- */}
        <label htmlFor="object-thumb" className="text-black">
          Thumb:{' '}
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="object-thumb"
          id="object-thumb"
          onChange={handleThumb}
          className="w-full bg-black p-2"
        />
        {/* --------------- */}

        {/* --------------- */}
        <label htmlFor="object-file" className="text-black">
          Objeto:
        </label>
        <input
          type="file"
          name="object-file"
          id="object-file"
          onChange={handleObjectFile}
          className="w-full bg-black p-2"
        />
        {/* --------------- */}

        <input type="submit" placeholder="send" className="mt-4 p-2" />
      </form>
    </div>
  );
};
