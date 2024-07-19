'use client';

import { login } from '@/config/axios';
import { ChangeEvent, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

import './style.css';
import { AuthContext } from '@/context/authContext';

export const Login = () => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleMail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSend = async () => {
    const validated = validate();
    if (validated.error) return toast.error(validated.error);
    try {
      const payload = await signIn(email, password);
      if (!payload) {
        return toast.error("E-mail ou senha incorretos");
      }
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };

  function validate() {
    function validateEmail(email: string) {
      const re: RegExp = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    if (!email || !password) {
      return { error: 'E-mail e senha são campos obrigatórios.' };
    }

    if (!validateEmail(email)) {
      return { error: 'E-mail inválido.' };
    }

    return { success: 'Logado com sucesso' };
  }

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
          className="bg-black block my-2 p-2"
          placeholder="E-mail"
          onChange={handleMail}
          value={email}
        />
        <label htmlFor="password" className="text-black block mt-2 self-start">
          Senha:
        </label>

        <input
          id="password"
          type="password"
          className="bg-black block my-2 text-black p-2"
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
