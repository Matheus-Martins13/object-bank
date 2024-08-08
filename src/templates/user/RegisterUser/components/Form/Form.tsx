import { ChangeEvent } from 'react';
import { Input } from './components/Input';

export const Form = ({
  handleName,
  handleCpf,
  handlePhone,
  handleProfileType,
  handleProfilePicture,
  handleMail,
  handlePassword,
  handleSend,
  name,
  cpf,
  phone,
  email,
  password,
}: {
  handleName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCpf: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePhone: (event: ChangeEvent<HTMLInputElement>) => void;
  handleProfileType: (event: any) => void;
  handleProfilePicture: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMail: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSend: (event: any) => Promise<string | undefined>;
  name: string;
  cpf: string;
  phone: string;
  profilePicture: FileList | null;
  email: string;
  password: string;
}) => {
  return (
    <div
      id="register"
      className="bg-primary-1 min-h-screen flex flex-col items-center justify-center"
    >
      <form>
        <div
          id="register-container"
          className="bg-white p-10 flex flex-col items-center justify-center"
        >
          <h1 className="font-bold text-xl text-black">Registrar usuário</h1>

          <Input
            id="nome-completo"
            label="Nome completo"
            type="text"
            value={name}
            placeholder="Nome completo"
            onChange={handleName}
            mask=""
          />

          <Input
            id="cpf"
            label="CPF (somente números)"
            type="text"
            value={cpf}
            placeholder="CPF"
            onChange={handleCpf}
            mask="999.999.999-99"
          />

          <Input
            id="phone"
            label="Telefone celular"
            type="text"
            value={phone}
            placeholder="Telefone celular"
            onChange={handlePhone}
            mask="(99)9 9999-9999"
          />

          <Input
            id="email"
            label="E-mail"
            type="email"
            value={email}
            placeholder="Ex.: email@email.com"
            onChange={handleMail}
            mask=""
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            value={password}
            placeholder="Sua senha"
            onChange={handlePassword}
            mask=""
          />

          <label htmlFor="profile-type" className="text-black self-start mt-6">
            Tipo de perfil:
          </label>
          <select
            id="profile-type"
            className="w-full bg-black p-2"
            defaultValue={'DEFAULT'}
            onChange={handleProfileType}
          >
            <option value="DEFAULT" disabled>
              Selecione o tipo de perfil
            </option>
            <option value="ALUNO">Aluno</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>

          <Input
            id="profile-picture"
            label="Foto de perfil"
            type="file"
            onChange={handleProfilePicture}
            mask=""
            accept="image/png, image/jpg"
          />

          <button
            className="bg-primary-1 rounded-md p-2 mt-8 self-end"
            type="submit"
            onClick={handleSend}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
