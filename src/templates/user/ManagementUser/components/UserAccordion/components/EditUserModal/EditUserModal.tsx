'use client';

import { ChangeEventHandler, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { UserDto } from '@/dtos/user.dto';
import { capitalize } from './utils/capitalize';
import ReactInputMask from 'react-input-mask';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import { updateUser } from '@/services/axios';
export const EditUserModal = ({
  user,
  loadUsers,
}: {
  user: UserDto;
  loadUsers: () => {};
}) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>(user.name);
  const [cpf, setCpf] = useState<string>(user.cpf);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState<string>(user.email);
  const [userType, setUserType] = useState<string>(user.type);
  const [password, setPassword] = useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '75%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    overflowY: 'scroll  ',
    p: 4,
  };

  const handleName = (event: any) => {
    setName(event.target.value);
  };

  const handleCpf = (event: any) => {
    setCpf(event.target.value);
  };

  const handlePhone = (event: any) => {
    setPhone(event.target.value);
  };

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleType = (event: any) => {
    setUserType(event.target.value);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSave = async () => {
    if (!name) {
      return toast.error('Você não pode salvar um usuário sem um nome');
    }
    if (!cpf) {
      return toast.error('Você não pode salvar um usuário sem CPF');
    }
    if (!phone) {
      return toast.error('Você não pode salvar um usuário sem telefone');
    }
    if (!email) {
      return toast.error('Você não pode salvar um usuário sem email');
    }
    if (!userType) {
      return toast.error('Você não pode salvar um usuário sem um tipo');
    }
    try {
      const updatedUser: UserDto = password
        ? {
            name,
            cpf,
            phone,
            email,
            type: userType,
            password,
          }
        : {
            name,
            cpf,
            phone,
            email,
            type: userType,
          };
      const response = await updateUser(user.idUser as string, updatedUser);
      if (response.error) return toast.error(response.message);
      toast.success('Usuário atualizado com sucesso');
      setTimeout(() => {
        loadUsers();
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-blue-400">
        <EditIcon color="primary" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <h1 className="text-black">Editando usuário '{user.name}'</h1>

          <label htmlFor="user-name-input" className="text-black mt-4 block">
            Nome:
          </label>
          <input
            type="text"
            name="user-name-input"
            id="user-name-input"
            value={name}
            onChange={handleName}
            placeholder="Nome do usuário"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label htmlFor="user-cpf-input" className="text-black mt-4 block">
            CPF:
          </label>
          <ReactInputMask
            mask="999.999.999-99"
            name="user-cpf-input"
            id="user-cpf-input"
            type="text"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
            placeholder="CPF do usuário"
            onChange={handleCpf}
            value={cpf}
          />

          <label htmlFor="user-phone-input" className="text-black mt-4 block">
            Número de telefone:
          </label>
          <ReactInputMask
            mask="(99) 9 9999-9999"
            name="user-phone-input"
            id="user-phone-input"
            type="text"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
            placeholder="Telefone do usuário"
            onChange={handlePhone}
            value={phone}
          />

          <label htmlFor="user-email-input" className="text-black mt-4 block">
            E-mail:
          </label>
          <input
            type="text"
            name="user-email-input"
            id="user-email-input"
            value={email}
            onChange={handleEmail}
            placeholder="E-mail do usuário"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label
            htmlFor="user-password-input"
            className="text-black mt-4 block"
          >
            Atualizar senha:
          </label>
          <input
            type="password"
            name="user-password-input"
            id="user-password-input"
            value={password}
            onChange={handlePassword}
            placeholder="Senha do usuário"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <label htmlFor="user-type-input" className="text-black mt-4 block">
            Tipo de perfil:
          </label>
          <select
            id="user-type-input"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
            defaultValue={'DEFAULT'}
            onChange={handleType}
          >
            <option value="DEFAULT" disabled className="text-white">
              {capitalize(userType)}
            </option>
            <option value="ALUNO" className="text-white">
              Aluno
            </option>
            <option value="ADMINISTRADOR" className="text-white">
              Aministrador
            </option>
          </select>

          <button
            className="mt-9 p-2 text-white"
            style={{ backgroundColor: '#333' }}
            onClick={handleSave}
          >
            Salvar
          </button>
        </Box>
      </Modal>
    </div>
  );
};
