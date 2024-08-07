'use client';

import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { ObjectDto } from '@/dtos/object.dto';
import { CollectionDto, CollectionWithObjectsDto } from '@/dtos/collection.dto';
import { styles } from '@/templates/object/RegisterObject/components/TagObjectSelect/components/Multiselect/style';
import { TagDbDto, TagDto } from '@/dtos/tag.dto';
import {
  findAllTags,
  registerTag,
  updateObject,
} from '@/services/axios';
import toast from 'react-hot-toast';
import CreatableSelect from 'react-select/creatable';

export const EditObjectModal = ({
  object,
  loadCollections,
  collections,
}: {
  object: ObjectDto;
  loadCollections: () => {};
  collections: CollectionWithObjectsDto[];
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(object.name);
  const [description, setDescription] = useState<string>(object.description);
  const [collection, setCollection] = useState<CollectionDto>(
    object.collection,
  );

  const [tagsDb, setTagsDb] = useState<TagDto[]>([]);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [tag, setTag] = useState();

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
    loadCollections();
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

  const handleCollection = async (event: any) => {
    setCollection(event.target.value);
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
    if (!collection)
      return toast.error('Você não pode salvar o objeto sem uma coleção');

    try {
      const objectToUpdate = {
        name,
        description,
        collection,
        tags: JSON.stringify(tags),
      };

      const response = await updateObject(object.idObject, objectToUpdate);
      if (response.error) return toast.error(response.message);

      toast.success('Objeto atualizado com sucesso');
      setTimeout(() => {
        loadCollections();
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

          <label htmlFor="object-name" className="text-black mt-4 block">
            Nome:
          </label>
          <input
            type="text"
            name=""
            id="object-name"
            value={name}
            onChange={handleName}
            placeholder="Nome do objeto"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label htmlFor="object-description" className="text-black mt-4 block">
            Descrição:
          </label>
          <textarea
            name=""
            id="object-description"
            value={description}
            onChange={handleDescription}
            placeholder="Descrição do objeto"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label htmlFor="collection-object" className="text-black mt-4 block">
            Coleção do objeto:
          </label>

          <select
            id="collection-object"
            className="w-full p-2 mt-2 text-white"
            defaultValue={'DEFAULT'}
            onChange={handleCollection}
            style={{ backgroundColor: '#333' }}
          >
            <option value="DEFAULT" disabled>
              {collection.name}
            </option>
            {collections ? (
              collections?.map((collection: any) => {
                return (
                  <option
                    key={collection.idCollection}
                    value={collection.idCollection}
                  >
                    {collection.name}
                  </option>
                );
              })
            ) : (
              <div>Loading...</div>
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
