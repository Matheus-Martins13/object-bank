'use client';
import { useState, useEffect } from 'react';
import favorite from './favourite.png';
import noFavorite from './heart.png';

import Image from 'next/image';
import {
  findFavorite,
  registerFavorite,
  removeFavorite,
} from '@/services/axios';
import toast from 'react-hot-toast';

export const Favorite = ({ idObject }: { idObject: string }) => {
  const idUser = 'ef949fdc-1e31-4727-ba63-1660896733dc';

  const [isFavorite, setIsFavorite] = useState(false);
  const [idFavorite, setIdFavorite] = useState<string>('');

  const loadFavorite = async () => {
    const response = await findFavorite(idObject, idUser);

    if (response) {
      setIsFavorite(true);
      setIdFavorite(response.idFavorite);
    }
  };

  useEffect(() => {
    loadFavorite();
  }, []);

  const handleFavorite = async () => {
    try {
      if (!isFavorite) {
        const response = await registerFavorite(idObject, idUser);
        if (response.error) return toast.error(response.message);
        loadFavorite();
      } else {
        const response = await removeFavorite(idFavorite);
        if (response.error) return toast.error(response.message);

        setIsFavorite(false);
        setIdFavorite('');
      }
    } catch (err) {
      console.log('ERROR:' + err);
    }
    setIsFavorite(!isFavorite);
  };

  if (!idUser) return <></>;

  return (
    <div className="min-w-10 cursor-pointer" onClick={handleFavorite}>
      {isFavorite ? (
        <Image src={favorite} alt="" width={35} />
      ) : (
        <Image src={noFavorite} alt="" width={30} />
      )}
    </div>
  );
};
