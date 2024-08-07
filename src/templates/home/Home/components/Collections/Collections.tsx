'use client';

import { useEffect, useState } from 'react';
import { Collection } from './components';
import { findAllCollectionsWithObjects } from '@/services/axios';
import { CollectionWithObjectsDto } from '@/dtos/collection.dto';

export const Collections = () => {
  const [collections, setCollections] = useState<CollectionWithObjectsDto[]>();

  const loadCollections = async () => {
    const collections: CollectionWithObjectsDto[] =
      await findAllCollectionsWithObjects();

    const collectionsFormatted: CollectionWithObjectsDto[] = collections.filter(
      (collection) => collection.object.length > 0,
    );

    setCollections(collectionsFormatted);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <div className="w-11/12 sm:w-3/5 lg:w-2/4 lg:self-start lg:ms-10">
      {collections ? (
        collections.length > 0 ? (
          collections?.map((collection) => (
            <div key={collection.idCollection}>
              <Collection
                key={collection.idCollection}
                collection={collection}
              />
            </div>
          ))
        ) : (
          <div className="text-black">Nenhum objeto cadastrado</div>
        )
      ) : (
        <div className="text-black">Carregando...</div>
      )}
    </div>
  );
};
