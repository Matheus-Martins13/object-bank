'use client';

import { ChangeEvent, useState } from 'react';
import { useAuthContext } from '@/context/authContext';
import { Box, Modal } from '@mui/material';
import toast from 'react-hot-toast';

export const Login = () => {
  const { signIn } = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      if (payload.error) {
        return toast.error(payload.message);
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-white me-2">
        Fazer login
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="login-container" className="">
            <h1 className="font-bold text-xl text-black">Banco de Objetos</h1>
            <label htmlFor="email" className="text-black mt-4 block">
              E-mail:
            </label>
            <input
              id="email"
              type="text"
              style={{ backgroundColor: '#333' }}
              className="w-full p-2 mt-2 text-white"
              placeholder="E-mail"
              onChange={handleMail}
              value={email}
            />
            <label htmlFor="password" className="text-black mt-4 block">
              Senha:
            </label>

            <input
              id="password"
              type="password"
              style={{ backgroundColor: '#333' }}
              className="w-full p-2 mt-2 text-white"
              placeholder="Senha"
              onChange={handlePassword}
              value={password}
            />

            <button
              className="mt-12 p-2 text-white bg-blue-500"
              onClick={handleSend}
            >
              Login
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
