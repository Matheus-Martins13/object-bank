'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ObjectDto } from '@/dtos/object.dto';
import { Loading } from '@/components/global-components';
import { Header } from '@/components/object-components/Header';
import { Comments, Metadata, Picture } from '@/components/object-components';
import { findObjectById } from '@/services/axios';
import { formatTypes } from '@/utils/format-type';

import './style.css';

export const Object = () => {
  const search = useSearchParams();
  const idObject = search.get('idObject');

  const router = useRouter();
  const [object, setObject] = useState<ObjectDto>();
  const [objectType, setObjectType] = useState<string>('');

  if (!idObject) router.push('/');

  const getObject = async () => {
    const response = await findObjectById(idObject as string);

    if (!response) return router.push('/');

    if (response.error) {
      setTimeout(() => {
        window.alert('Ocorreu um erro');
      }, 3000);
      return router.push('/');
    }

    if (!response) return router.push('/');

    const { mimetype } = response.objectFile;
    setObjectType(formatTypes(mimetype));
    setObject(response);
  };

  useEffect(() => {
    getObject();
  }, []);

  if (object) {
    return (
      <div className="min-w-full min-h-screen bg-white flex flex-col items-center justify-center">
        <div id="object" className="md:flex md:items-center md:justify-around">
          <div id="container" className="w-2/4 mt-8 ms-8">
            <Header object={object} />

            <div id="object-picture">
              <Picture object={object} />
            </div>
            <div id="object-description" className="mt-8">
              <p className="text-black">{object.description}</p>
            </div>

            <Metadata object={object} objectType={objectType} />

            <button className="text-black bg-slate-500 p-2 rounded-md my-4 mb-10">
              <a href={object.objectFile.path} target="_blank">
                Abrir
              </a>
            </button>
          </div>
          <Comments idObject={object.idObject} />
        </div>
      </div>
    );
  }

  return <Loading />;
};
