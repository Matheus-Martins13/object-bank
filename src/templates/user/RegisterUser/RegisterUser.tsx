'use client';

import { Form } from './components';
import { ChangeEvent, useState } from 'react';
import { validate } from './utils/validate.util';
import { registerUser } from '@/services/axios';
import toast from 'react-hot-toast';

export const RegisterUser = () => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [profileType, setProfileType] = useState<any>('');
  const [profilePicture, setProfilePicture] = useState<FileList | null>(null);

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCpf = (event: ChangeEvent<HTMLInputElement>) => {
    setCpf(
      event.target.value.replace('.', '').replace('.', '').replace('-', ''),
    );
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(
      event.target.value
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('-', ''),
    );
  };

  const handleMail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleProfileType = (event: any) => {
    setProfileType(event.target.value);
  };

  const handleProfilePicture = (event: ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(event.target.files);
  };

  const handleSend = async (event: any) => {
    event.preventDefault();
    try {
      const data = {
        name,
        cpf,
        phone,
        email,
        password,
        profileType,
      };

      const validated = validate(data);

      if (validated.error) return toast.error(validated.error);

      const formData = new FormData();

      if (profilePicture) {
        if (!profilePicture.item(0)!.type.startsWith('image/')) {
          return toast.error('Tipo de arquivo não suportado');
        }
        formData.append('photo', profilePicture.item(0) as Blob);
      }

      formData.append('name', data.name);
      formData.append('cpf', data.cpf);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('profileType', data.profileType);

      const response = await registerUser(formData);

      if (response.error) {
        return toast.error(response.message);
      }

      toast.success('Usuário cadastrado com sucesso');
      setName('');
      setCpf('');
      setPhone('');
      setEmail('');
      setPassword('');
      setProfileType('');
      setProfilePicture(null);
    } catch (err) {
      toast.error(`ERROR: ${err}`);
    }
  };

  return (
    <Form
      handleName={handleName}
      handleCpf={handleCpf}
      handlePhone={handlePhone}
      handleMail={handleMail}
      handlePassword={handlePassword}
      handleProfileType={handleProfileType}
      handleProfilePicture={handleProfilePicture}
      handleSend={handleSend}
      name={name}
      cpf={cpf}
      phone={phone}
      email={email}
      password={password}
      profilePicture={profilePicture}
    />
  );
};
