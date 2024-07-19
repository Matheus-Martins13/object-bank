import { ChangeEvent } from 'react';
import { Input } from './components';

export const Form = ({
  handleName,
  handleCpf,
  handleBirthday,
  handleCep,
  handleEstado,
  handleCidade,
  handleBairro,
  handleLogradouro,
  handleNumero,
  handleComplemento,
  handlePhone,
  handleProfileType,
  handleProfilePicture,
  handleMail,
  handlePassword,
  handleSend,
  name,
  cpf,
  birthday,
  cep,
  estado,
  cidade,
  bairro,
  logradouro,
  numero,
  complemento,
  phone,
  profilePicture,
  email,
  password,
}: {
  handleName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCpf: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBirthday: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCep: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEstado: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCidade: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBairro: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLogradouro: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNumero: (event: ChangeEvent<HTMLInputElement>) => void;
  handleComplemento: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePhone: (event: ChangeEvent<HTMLInputElement>) => void;
  handleProfileType: (event: any) => void;
  handleProfilePicture: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMail: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSend: (event: any) => Promise<string | undefined>;
  name: string;
  cpf: string;
  birthday: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
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
      <form onSubmit={handleSend}>
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
          />

          <Input
            id="cpf"
            label="CPF (somente números)"
            type="text"
            value={cpf}
            placeholder="CPF"
            onChange={handleCpf}
          />

          <Input
            id="birthday"
            label="Data de Nascimento"
            type="date"
            value={birthday}
            placeholder="Sua senha"
            onChange={handleBirthday}
          />

          <Input
            id="cep"
            label="CEP (somente números)"
            type="text"
            value={cep}
            placeholder="CEP"
            onChange={handleCep}
          />

          <Input
            id="estado"
            label="Estado"
            type="text"
            value={estado}
            placeholder="Estado"
            onChange={handleEstado}
          />

          <Input
            id="cidade"
            label="Cidade"
            type="text"
            value={cidade}
            placeholder="Cidade"
            onChange={handleCidade}
          />

          <Input
            id="bairro"
            label="Bairro"
            type="text"
            value={bairro}
            placeholder="Bairro"
            onChange={handleBairro}
          />

          <Input
            id="logradouro"
            label="Logradouro"
            type="text"
            value={logradouro}
            placeholder="Logradouro"
            onChange={handleLogradouro}
          />

          <Input
            id="numero"
            label="Número"
            type="text"
            value={numero}
            placeholder="Sua senha"
            onChange={handleNumero}
          />

          <Input
            id="complemento"
            label="Complemento"
            type="text"
            value={complemento}
            placeholder="Complemento"
            onChange={handleComplemento}
          />

          <Input
            id="phone"
            label="Telefone celular"
            type="text"
            value={phone}
            placeholder="Telefone celular"
            onChange={handlePhone}
          />

          <Input
            id="email"
            label="E-mail"
            type="email"
            value={email}
            placeholder="Ex.: email@email.com"
            onChange={handleMail}
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            value={password}
            placeholder="Sua senha"
            onChange={handlePassword}
          />

          <label htmlFor="profile-type" className="text-black self-start mt-6">
            Tipo de perfil:
          </label>
          <select
            id="profile-type"
            className="w-full bg-black p-2"
            defaultValue="tipo-perfil"
            onChange={handleProfileType}
          >
            <option value="tipo-perfil" disabled selected>
              Selecione o tipo de perfil
            </option>
            <option value="aluno">Aluno</option>
            <option value="professor">Administrador</option>
          </select>

          <Input
            id="profile-picture"
            label="Foto de perfil"
            type="file"
            value={profilePicture}
            onChange={handleProfilePicture}
          />

          <button
            className="bg-primary-1 rounded-md p-2 mt-8 self-end"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
