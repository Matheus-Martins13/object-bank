'use client';
import { useState, useEffect } from 'react';
import favorite from './favourite.png';
import noFavorite from './heart.png';

import Image from 'next/image';
import { ObjectDto } from '@/dtos/object.dto';
import {
  findFavorite,
  registerFavorite,
  removeFavorite,
} from '@/services/axios';
import toast from 'react-hot-toast';

export const Favorite = ({ object }: { object: ObjectDto }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [idFavorite, setIdFavorite] = useState<string>('');

  const loadFavorite = async () => {
    const response = await findFavorite(object.idObject, object.user.idUser);

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
        const response = await registerFavorite(
          object.idObject,
          object.user.idUser,
        );
        if (response.error) return toast.error(response.message);
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
