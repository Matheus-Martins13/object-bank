'use client';

import { login } from '@/config/axios';
import { ChangeEvent, useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleMail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSend = async () => {
    const payload = await login(email, password);
    console.log(payload);
  };

  return (
    <div
      id="login"
      className="bg-primary-1 min-h-screen flex flex-col items-center justify-center"
    >
      <div
        id="login-container"
        className="bg-white p-10 flex flex-col items-center justify-center"
      >
        <h1 className="font-bold text-xl text-black">Banco de Objetos</h1>
        <label htmlFor="email" className="text-black block mt-4 self-start">
          E-mail:
        </label>
        <input
          id="email"
          type="text"
          className="bg-black opacity-20 block my-2 text-black p-2"
          placeholder="E-mail"
          onChange={handleMail}
          value={email}
        />
        <label htmlFor="email" className="text-black block mt-2 self-start">
          Senha:
        </label>

        <input
          type="password"
          className="bg-black opacity-20 block my-2 text-black p-2"
          placeholder="Senha"
          onChange={handlePassword}
          value={password}
        />

        <button
          className="bg-primary-1 rounded-md p-2 mt-8 self-end"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
