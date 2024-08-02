'use client';

import { useState, useEffect } from 'react';
// import { useAuthContext } from '@/context/authContext';
import { TagDbDto, TagDto } from '@/dtos/tag.dto';
import { CategoryDto } from '@/dtos/category.dto';
import { SubcategoryDto } from '@/dtos/subcategory.dto';
import { validateObject } from './utils/validate-object';
import { ObjectSendDto } from '@/dtos/object.dto';
import {
  CategoryObjectSelect,
  DescriptionObjectInput,
  FileObjectInput,
  NameObjectInput,
  SubcategoryObjectSelect,
  ThumbObjectInput,
  TagObjectSelect,
} from '@/components/register-object-components';
import {
  findAllCategories,
  findAllSubcategoriesInCategory,
  findAllTags,
  registerObject,
  registerTag,
} from '@/services/axios';
import toast from 'react-hot-toast';

export const RegisterObject = () => {
  const { user } = { user: { idUser: '9b3811c0-63f4-4d02-8dd4-caec0028d147' } };
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [subcategories, setSubcatecories] = useState<SubcategoryDto[]>([]);

  const [objectName, setObjectName] = useState<string>('');
  const [objectDescription, setObjectDescription] = useState<string>('');

  const [category, setCategory] = useState<CategoryDto>();
  const [subcategory, setSubcategory] = useState<SubcategoryDto>();

  const [thumb, setThumb] = useState<File>();
  const [thumbView, setThumbView] = useState<string>('');
  const [objectFile, setObjectFile] = useState<File>();

  const [tagsDb, setTagsDb] = useState<TagDto[]>([]);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [tag, setTag] = useState<string>('');

  //  -----  LOADS
  const loadTags = async () => {
    const tagsFound: TagDbDto[] = await findAllTags();

    const options: TagDto[] = [];

    tagsFound.forEach((tag: any) => {
      options.push({
        value: tag.name,
        label: tag.name,
        idTag: tag.idTag,
      });
    });

    setTagsDb(options);
  };

  const loadCategories = async () => {
    const categoriesFound = await findAllCategories();
    setCategories(categoriesFound);
  };

  const loadSubcategories = async (idCategory: string) => {
    const subcategoriesFound = await findAllSubcategoriesInCategory(idCategory);
    setSubcatecories(subcategoriesFound);
  };

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  // ---- END LOADS

  // ---- HANDLES

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
    if (event.target.files && event.target.files[0]) {
      setThumb(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setThumbView(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
    if (!(event.code == 'Enter')) return;
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

    const object: ObjectSendDto = {
      name: objectName,
      description: objectDescription,
      category,
      subcategory,
      tags,
      thumb,
      objectFile,
      user: user.idUser,
    };

    const isValid = validateObject(object);

    if (isValid.error) return toast.error(isValid.message);

    try {
      const formData: any = new FormData();

      formData.append('name', object.name);
      formData.append('description', object.description);
      formData.append('category', object.category);
      formData.append('subcategory', object.subcategory);
      formData.append('tags', JSON.stringify(object.tags));
      formData.append('objectFile', object.objectFile);
      formData.append('objectFile', object.thumb);
      formData.append('user', user.idUser);

      const response = await registerObject(formData);
      if (response.error) return toast.error(response.message);

      setObjectName('');
      setObjectDescription('');
      setCategory(undefined);
      setSubcategory(undefined);
      setTags([]);
      setThumb(undefined);
      setObjectFile(undefined);
      return toast.success(`Objeto '${objectName}' cadastrado com sucesso`);
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
        <NameObjectInput
          objectName={objectName}
          handleObjectName={handleObjectName}
        />
        {/* --------------- */}

        {/* --------------- */}
        <DescriptionObjectInput
          objectDescription={objectDescription}
          handleObjectDescription={handleObjectDescription}
        />
        {/* --------------- */}

        {/* --------------- */}
        <CategoryObjectSelect
          handleCategory={handleCategory}
          categories={categories}
        />
        {/* --------------- */}

        {/* --------------- */}
        {category && (
          <SubcategoryObjectSelect
            handleSubcategory={handleSubcategory}
            subcategories={subcategories}
          />
        )}
        {/* --------------- */}

        {/* --------------- */}
        <ThumbObjectInput handleThumb={handleThumb} />
        {thumb && <img src={thumbView} className="w-80" />}
        {/* --------------- */}

        {/* --------------- */}
        <FileObjectInput handleObjectFile={handleObjectFile} />
        {/* --------------- */}
      </form>

      <TagObjectSelect
        handleSendTag={handleSendTag}
        handleTag={handleTag}
        handleTags={handleTags}
        tags={tags}
        tagsDb={tagsDb}
      />

      <button onClick={handleSend} className="mt-4 p-2 bg-black" type="button">
        Enviar
      </button>
    </div>
  );
};
