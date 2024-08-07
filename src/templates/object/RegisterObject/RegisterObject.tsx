'use client';

import { useState, useEffect } from 'react';
// import { useAuthContext } from '@/context/authContext';
import { TagDbDto, TagDto } from '@/dtos/tag.dto';
import { CollectionDto } from '@/dtos/collection.dto';
import { validateObject } from './utils/validate-object';
import { ObjectSendDto } from '@/dtos/object.dto';
import {
  CollectionObjectSelect,
  DescriptionObjectInput,
  FileObjectInput,
  NameObjectInput,
  ThumbObjectInput,
  TagObjectSelect,
} from './components';
import {
  findAllCollections,
  findAllCollectionsWithObjects,
  findAllTags,
  registerObject,
  registerTag,
} from '@/services/axios';
import toast from 'react-hot-toast';

export const RegisterObject = () => {
  const { user } = { user: { idUser: '3759f9c7-dd37-45f9-a0a8-d76844eed16f' } };
  const [collections, setCollections] = useState<CollectionDto[]>([]);

  const [objectName, setObjectName] = useState<string>('');
  const [objectDescription, setObjectDescription] = useState<string>('');

  const [collection, setCollection] = useState<CollectionDto>();

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

  const loadCollections = async () => {
    const collectionsFound = await findAllCollections();
    setCollections(collectionsFound);
  };

  useEffect(() => {
    loadCollections();
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

  const handleCollection = (event: any) => {
    setCollection(event.target.value);
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
      collection,
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
      formData.append('collection', object.collection);
      formData.append('tags', JSON.stringify(object.tags));
      formData.append('objectFile', object.objectFile);
      formData.append('objectFile', object.thumb);
      formData.append('user', user.idUser);

      const response = await registerObject(formData);
      if (response.error) return toast.error(response.message);

      setObjectName('');
      setObjectDescription('');
      setCollection(undefined);
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
      id="register-object"
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
        <CollectionObjectSelect
          handleCollection={handleCollection}
          collections={collections}
        />
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
