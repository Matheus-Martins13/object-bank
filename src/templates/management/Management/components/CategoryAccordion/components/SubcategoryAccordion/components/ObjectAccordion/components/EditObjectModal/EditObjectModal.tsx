'use client';

import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { ObjectDto } from '@/dtos/object.dto';
import { CategoryDto, CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import { SubcategoryDto } from '@/dtos/subcategory.dto';
import { styles } from '@/templates/object/RegisterObject/components/TagObjectSelect/components/Multiselect/style';
import { TagDbDto, TagDto } from '@/dtos/tag.dto';
import {
  findAllSubcategoriesInCategory,
  findAllTags,
  registerTag,
  updateObject,
} from '@/services/axios';
import toast from 'react-hot-toast';
import CreatableSelect from 'react-select/creatable';

export const EditObjectModal = ({
  object,
  loadCategories,
  categories,
}: {
  object: ObjectDto;
  loadCategories: () => {};
  categories: CategoryWithSubcategoriesDto[];
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(object.name);
  const [description, setDescription] = useState<string>(object.description);
  const [category, setCategory] = useState<CategoryDto>(object.category);
  const [subcategory, setSubcategory] = useState<SubcategoryDto>(
    object.subcategory,
  );

  const [tagsDb, setTagsDb] = useState<TagDto[]>([]);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [tag, setTag] = useState();

  const [subcategories, setSubcategories] = useState<SubcategoryDto[]>();

  const loadSubcategories = async (idCategoryChange?: string) => {
    const idCategory = category.idCategory;
    const subcategoriesFound = await findAllSubcategoriesInCategory(
      idCategoryChange ? idCategoryChange : idCategory,
    );
    setSubcategories(subcategoriesFound);
  };

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

    const tagsFormatted: TagDto[] = [];

    object.tag.forEach((tag: any) => {
      tagsFormatted.push({
        value: tag.name,
        label: tag.name,
        idTag: tag.idTag,
      });
    });

    setTagsDb(options);
    setTags(tagsFormatted);
  };

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleName = async (event: any) => {
    setName(event.target.value);
  };

  const handleDescription = async (event: any) => {
    setDescription(event.target.value);
  };

  const handleCategory = async (event: any) => {
    loadSubcategories(event.target.value);
    setSubcategory({
      name: '',
      idCategory: '',
      idSubcategory: '',
      updatedAt: '',
      createdAt: '',
    });
    setCategory(event.target.value);
  };

  const handleSubcategory = async (event: any) => {
    setSubcategory(event.target.value);
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

  const handleSave = async (event: any) => {
    event.preventDefault();

    if (!name) return toast.error('Você não pode salvar o objeto sem um nome');

    if (!description)
      return toast.error('Você não pode salvar o objeto sem uma descrição');
    if (!category)
      return toast.error('Você não pode salvar o objeto sem uma categoria');
    if (!subcategory)
      return toast.error('Você não pode salvar o objeto sem uma subcategoria');
    try {
      const objectToUpdate = {
        name,
        description,
        category,
        subcategory,
        tags: JSON.stringify(tags),
      };

      const response = await updateObject(object.idObject, objectToUpdate);
      if (response.error) return toast.error(response.message);

      toast.success('Objeto atualizado com sucesso');
      setTimeout(() => {
        loadCategories();
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-blue-400">
        <span className="me-4 text-blue-500">Editar</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-black">Editando o objeto '{object.name}'</h1>

          <label htmlFor="category-name" className="text-black mt-4 block">
            Nome:
          </label>
          <input
            type="text"
            name=""
            id="category-name"
            value={name}
            onChange={handleName}
            placeholder="Nome da categoria"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label
            htmlFor="category-description"
            className="text-black mt-4 block"
          >
            Descrição:
          </label>
          <textarea
            name=""
            id="category-description"
            value={description}
            onChange={handleDescription}
            placeholder="Nome da categoria"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label htmlFor="category-object" className="text-black mt-4 block">
            Categoria do objeto:
          </label>

          <select
            id="category-object"
            className="w-full p-2 mt-2 text-white"
            defaultValue={'DEFAULT'}
            onChange={handleCategory}
            style={{ backgroundColor: '#333' }}
          >
            <option value="DEFAULT" disabled>
              {category.name}
            </option>
            {categories ? (
              categories?.map((cat: any) => {
                return (
                  <option key={cat.idCategory} value={cat.idCategory}>
                    {cat.name}
                  </option>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </select>

          <label htmlFor="category-object" className="text-black mt-4 block">
            Subcategoria do objeto:
          </label>

          <select
            id="category-object"
            className="w-full p-2 my-2 mb-4 text-white"
            defaultValue={'DEFAULT'}
            onChange={handleSubcategory}
            style={{ backgroundColor: '#333' }}
          >
            <option value="DEFAULT" disabled>
              {subcategory.name}
            </option>
            {subcategories ? (
              subcategories?.map((subcat: any) => {
                return (
                  <option
                    key={subcat.idSubcategory}
                    value={subcat.idSubcategory}
                  >
                    {subcat.name}
                  </option>
                );
              })
            ) : (
              <></>
            )}
          </select>

          <label htmlFor="" className="text-black mb-2 block">
            Tags:
          </label>

          <CreatableSelect
            isClearable
            closeMenuOnSelect={false}
            isMulti
            value={tags}
            options={tagsDb}
            styles={styles}
            onChange={handleTags}
            onInputChange={handleTag}
            onKeyDown={handleSendTag}
            placeholder="Escolha as tags"
          />

          <button
            className="mt-9 p-2 text-white"
            style={{ backgroundColor: '#333' }}
            onClick={handleSave}
          >
            Salvar
          </button>
        </Box>
      </Modal>
    </div>
  );
};
