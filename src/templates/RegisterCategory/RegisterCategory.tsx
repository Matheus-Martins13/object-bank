'use client';
import { Form } from '@/components/register-category-components';
import { registerCategory } from '@/services/axios';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

export const RegisterCategory = () => {
  const [category, setCategory] = useState<string>('');

  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleSend = async (event: any) => {
    event.preventDefault();
    if (!category) return toast.error('O nome da categoria é obrigatório');
    try {
      const response = await registerCategory(category);
      if (response.error) return toast.error(response.error);

      return toast.success(`Categoria '${category}' cadastrada com sucesso`);
    } catch (err) {
      console.log('ERROR:' + err);
    }
  };

  return (
    <div
      id="register-category"
      className="bg-primary-1 min-h-screen flex flex-col items-center justify-center"
    >
      <Form
        category={category}
        handleCategory={handleCategory}
        handleSend={handleSend}
      />
    </div>
  );
};
