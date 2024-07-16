"use client"

import { createContext, useContext } from 'react';

interface UserInterface {
  idUser: string;
  name: string;
  cpf: string;
  birthday: string;
  cep: string;
  estado: string;
  numero: string;
  complemento: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  phone: string;
  email: string;
  password: string;
  profilePicture: {
    name: string;
    path: string;
  };
  profileType: string;
}

const user = {
  idUser: '536a9c15-53c8-4eb2-ab8d-addb5759b8bd',
  name: 'cacaca',
  cpf: '12345678913',
  birthday: '2002-10-10',
  cep: '24379876',
  estado: 'Rio de Janeiro',
  numero: '1',
  complemento: '',
  cidade: 'Bel',
  bairro: 'itai',
  logradouro: 'asdasd',
  phone: '21333333332',
  email: 'eee@emaill.com',
  password: '$2b$10$tDrX79WqI8GGw.nw5DANB.OOotoRZo4FaVT47DnaSO8sWSD5xxU5e',
  profilePicture: {
    name: 'profile-picture-26cc3560-f25e-4da9-aca8-e9a8e27b22e9.png',
    path: 'users/profile-picture/profile-picture-26cc3560-f25e-4da9-aca8-e9a8e27b22e9.png',
  },
  profileType: 'ALUNO',
};

export const AuthContext = createContext(user);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

