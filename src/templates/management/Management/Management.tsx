'use client';

import { useState, useEffect } from 'react';
import { CollectionWithObjectsDto } from '@/dtos/collection.dto';
import { findAllCollectionsWithObjects } from '@/services/axios';
import { formatCollection } from './utils/format-collection.util';
import { CollectionAccordion } from './components';
import toast from 'react-hot-toast';

export const Management = () => {
  const [collections, setCollections] = useState<CollectionWithObjectsDto[]>();
  const [textFilter, setTextFilter] = useState<string>('');

  const loadCollections = async () => {
    try {
      const collectionsFound: any = await findAllCollectionsWithObjects();
      if (collectionsFound.error) return toast.error(collectionsFound.message);

      const collectionsFormatted = formatCollection(collectionsFound);

      if (textFilter) {
        const textFilterLowerCase = textFilter.toLowerCase();

        const collectionsWithFilter = collectionsFound.filter(
          (collection: CollectionWithObjectsDto) => {
            if (collection.name.toLowerCase().includes(textFilterLowerCase))
              return collection;
            for (const object of collection.object) {
              if (object.name.toLowerCase().includes(textFilterLowerCase))
                return collection;
              if (
                object.description.toLowerCase().includes(textFilterLowerCase)
              )
                return collection;
            }
          },
        );
        return setCollections(collectionsWithFilter);
      }
      setCollections(collectionsFormatted);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  useEffect(() => {
    loadCollections();
  }, [textFilter]);

  const handleFilter = (event: any) => {
    setTextFilter(event.target.value);
  };

  if (collections) {
    return (
      <div className="flex flex-col justify-center items-center my-4 w-full">
        <h1 className="text-black font-bold text-xl mb-6">
          Painel de Gerenciamento
        </h1>

        <div className="w-2/4">
          <input
            type="text"
            className="p-2 border-2 border-gray-800 w-full"
            placeholder="Buscar"
            onChange={handleFilter}
          />
        </div>

        {collections.map((collection) => (
          <div className="w-3/4 md:2/4 mt-4" key={collection.idCollection}>
            <CollectionAccordion
              collection={collection}
              loadCollections={loadCollections}
              key={collection.idCollection}
              collections={collections}
            />
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};
