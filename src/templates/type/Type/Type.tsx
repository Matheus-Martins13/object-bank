'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { findObjectByType } from '@/services/axios';
import { ObjectDto } from '@/dtos/object.dto';

export const Type = () => {
  const router = useRouter();
  const search = useSearchParams();
  const type = search.get('type');

  const [objects, setObjects] = useState<ObjectDto[]>([]);

  const getObject = async () => {
    const response = await findObjectByType(type as string);
    console.log(response);
    if (!response) return router.push('/');

    if (response.error) {
      setTimeout(() => {
        window.alert('Ocorreu um erro');
      }, 3000);
      return router.push('/');
    }

    if (!response) return router.push('/');

    setObjects(response);
  };

  useEffect(() => {
    getObject();
  }, []);
  if (objects) {
    return (
      <div>
        {objects.map((object: ObjectDto) => (
          <div className="text-black">{object.name}</div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};
