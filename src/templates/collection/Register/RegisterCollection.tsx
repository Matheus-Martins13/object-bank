'use client';
import { Form } from './components';
import { registerCollection } from '@/services/axios';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

export const RegisterCollection = () => {
  const [collection, setCollection] = useState<string>('');

  const handleCollection = (event: ChangeEvent<HTMLInputElement>) => {
    setCollection(event.target.value);
  };

  const handleSend = async (event: any) => {
    event.preventDefault();
    if (!collection) return toast.error('O nome da coleção é obrigatório');
    try {
      const response = await registerCollection(collection);
      if (response.error) return toast.error(response.message);

      return toast.success(`Coleção '${collection}' cadastrada com sucesso`);
    } catch (err) {
      console.log('ERROR:' + err);
    }
  };

  return (
    <div
      id="register-collection"
      className="bg-primary-1 min-h-screen flex flex-col items-center justify-center"
    >
      <Form
        collection={collection}
        handleCollection={handleCollection}
        handleSend={handleSend}
      />
    </div>
  );
};
