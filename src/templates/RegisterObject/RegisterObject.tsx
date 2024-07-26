'use client';

import { useState, useEffect } from 'react';
import {
  findAllCategories,
  findAllSubcategoriesInCategory,
  findAllTags,
  registerTag,
} from '@/services/axios';
import { Multiselect } from '@/components/register-object-components/Multiselect';
import { TagInterface } from '@/dtos/tag.dto';

import toast from 'react-hot-toast';

export const RegisterObject = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcatecories] = useState([]);

  const [objectName, setObjectName] = useState('');
  const [objectDescription, setObjectDescription] = useState('');
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();

  const [tagsDb, setTagsDb] = useState<
    { value: string; label: string; idTag: string }[]
  >([]);
  const [tags, setTags] = useState<
    { value: string; label: string; idTag?: string }[]
  >([]);
  const [tag, setTag] = useState();

  const [thumb, setThumb] = useState();
  const [objectFile, setObjectFile] = useState();

  const loadCategories = async () => {
    const categoriesFound = await findAllCategories();
    setCategories(categoriesFound);
  };

  const loadTags = async () => {
    const tagsFound = await findAllTags();

    const options: any = [];

    tagsFound.forEach((tag: any) => {
      options.push({ value: tag.name, label: tag.name, idTag: tag.idTag });
    });

    setTagsDb(options);
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

  const handleThumb = (event: any) => {
    setThumb(event.target.files[0]);
  };

  const handleObjectFile = (event: any) => {
    setObjectFile(event.target.files[0]);
  };

  const handleTags = (event: any) => {
    setTags(event);
  };

  const handleTag = (event: any) => {
    setTag(event);
  };

  const handleSendTag = async (event: any) => {
    event.preventDefault();
    try {
      if (tag) {
        const response = await registerTag(tag);
        if (response.error) return toast.error(response.message);
        const updatedTags = tags;
        updatedTags.push({
          value: response.name,
          label: response.name,
          idTag: response.idTag,
        });
        setTags(updatedTags);
      }
    } catch (err) {
      console.log('ERROR: ' + err);
    }
  };

  const handleSend = async (event: any) => {
    event.preventDefault();

    // if (!objectName) {
    //   return toast.error('O nome do objeto é obrigatório');
    // }
    // if (!objectDescription) {
    //   return toast.error('A descrição do objeto é obrigatória');
    // }
    // if (!category) {
    //   return toast.error('A categoria do objeto deve ser selecionada');
    // }
    // if (!subcategory) {
    //   return toast.error('A subcategoria do objeto deve ser selecionada');
    // }
    // if (!objectFile) {
    //   return toast.error('Você deve enviar um arquivo para o objeto');
    // }

    const data = {
      name: objectName,
      description: objectDescription,
      category,
      subcategory,
      tags,
      thumb,
      objectFile,
    };

    console.log(data);

    try {
      // const response = await registerSubcategory(subcategory, category);
      // if (response.error) return toast.error(response.message);
      // return toast.success(
      //   `Subcategoria '${subcategory}' cadastrada com sucesso`,
      // );
    } catch (err) {
      console.log('ERROR:' + err);
    }
  };

  return (
    <div
      id="register-category"
      className="min-h-screen flex items-center justify-center flex-col w-full"
    >
      <form className="w-2/4" onSubmit={handleSend}>
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
        <label htmlFor="object-thumb" className="text-black">
          Thumb:
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
      </form>

      <form onSubmit={handleSendTag} className="w-2/4">
        {/* --------------- */}
        <label htmlFor="" className="text-black mt-6">
          Tags:
        </label>
        <Multiselect
          tags={tagsDb}
          tagsSelected={tags}
          handleTags={handleTags}
          handleTag={handleTag}
        />

        {/* --------------- */}
      </form>

      <button onClick={handleSend} className="mt-4 p-2 bg-black">
        Enviar
      </button>
    </div>
  );
};
