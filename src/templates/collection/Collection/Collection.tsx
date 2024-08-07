'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CollectionWithObjectsDto } from '@/dtos/collection.dto';
import { findCollectionByIdComplete } from '@/services/axios';
import { ObjectDto } from '@/dtos/object.dto';
import Link from 'next/link';

import './style.css';

export const Collection = () => {
  const router = useRouter();
  const search = useSearchParams();

  const idCollection = search.get('idCollection');

  const [collection, setCollection] = useState<CollectionWithObjectsDto>();

  const getCollection = async () => {
    const response = await findCollectionByIdComplete(idCollection as string);

    if (!response) return router.push('/');

    if (response.error) {
      setTimeout(() => {
        window.alert('Ocorreu um erro');
      }, 3000);
      return router.push('/');
    }

    if (!response) return router.push('/');

    setCollection(response);
  };

  useEffect(() => {
    getCollection();
  }, []);

  if (collection) {
    return (
      <div className="w-full flex flex-col p-4">
        <h1 className="font-bold text-4xl mt-8 self-center">
          {collection.name}
        </h1>

        {collection.object.map((object: ObjectDto) => (
          <div
            className="flex flex-col items-center w-11/12 self-center"
            key={object.idObject}
          >
            <div className="flex w-full" id="objects-grid">
              <div key={object.idObject}>
                <Link
                  href={{
                    pathname: '/object',
                    query: { idObject: object.idObject },
                  }}
                >
                  <div
                    key={object.idObject}
                    className="bg-black text-white p-4"
                  >
                    {object.name}
                  </div>
                </Link>
                <div key={object.idObject} className="bg-black text-white p-4">
                  {object.name}
                </div>
                <div key={object.idObject} className="bg-black text-white p-4">
                  {object.name}
                </div>
                <div key={object.idObject} className="bg-black text-white p-4">
                  {object.name}
                </div>
                <div key={object.idObject} className="bg-black text-white p-4">
                  {object.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};
