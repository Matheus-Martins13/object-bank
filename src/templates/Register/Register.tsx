'use client';

import { Form } from '@/components/register-components';
import { ChangeEvent, useState } from 'react';
import { validate } from './utils/validate.util';
import { formatEstado } from './utils/format-estado';
import { register } from '@/config/axios';
import toast from 'react-hot-toast';

export const Register = () => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [logradouro, setLogradouro] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [complemento, setComplemento] = useState<string>('');
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

  const handleBirthday = (event: ChangeEvent<HTMLInputElement>) => {
    setBirthday(event.target.value);
  };

  const handleCep = async (event: ChangeEvent<HTMLInputElement>) => {
    const cepCap = event.target.value.replace('-', '');

    if (cepCap.length == 8) {
      fetch(`https://viacep.com.br/ws/${cepCap}/json/`)
        .then((response) => response.json())
        .then((data) => {
          const estadoFormated = formatEstado(data.uf);
          setEstado(estadoFormated);
          setCidade(data.localidade);
          setBairro(data.bairro);
          setLogradouro(data.logradouro);
        })
        .catch((error) => null);
    }
    setCep(event.target.value);
  };

  const handleEstado = (event: ChangeEvent<HTMLInputElement>) => {
    setEstado(event.target.value);
  };

  const handleCidade = (event: ChangeEvent<HTMLInputElement>) => {
    setCidade(event.target.value);
  };

  const handleBairro = (event: ChangeEvent<HTMLInputElement>) => {
    setBairro(event.target.value);
  };

  const handleLogradouro = (event: ChangeEvent<HTMLInputElement>) => {
    setLogradouro(event.target.value);
  };

  const handleNumero = (event: ChangeEvent<HTMLInputElement>) => {
    setNumero(event.target.value);
  };

  const handleComplemento = (event: ChangeEvent<HTMLInputElement>) => {
    setComplemento(event.target.value);
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(
      event.target.value.replace('(', '').replace(')', '').replace('-', ''),
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
        birthday,
        cep,
        estado,
        cidade,
        bairro,
        logradouro,
        numero,
        complemento,
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
      formData.append('birthday', data.birthday);
      formData.append('cep', data.cep);
      formData.append('estado', data.estado);
      formData.append('cidade', data.cidade);
      formData.append('bairro', data.bairro);
      formData.append('logradouro', data.logradouro);
      formData.append('numero', data.numero);
      formData.append('complemento', data.complemento);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('profileType', data.profileType);

      // console.log(data);

      const response = await register(formData);
      console.log(response);

      if (response.error) {
        return toast.error(response.message);
      }

      toast.success('Usuário cadastrado com sucesso');
      setName('');
      setCpf('');
      setBirthday('');
      setCep('');
      setEstado('');
      setCidade('');
      setBairro('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
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
      handleBirthday={handleBirthday}
      handleCep={handleCep}
      handleEstado={handleEstado}
      handleCidade={handleCidade}
      handleBairro={handleBairro}
      handleLogradouro={handleLogradouro}
      handleNumero={handleNumero}
      handleComplemento={handleComplemento}
      handlePhone={handlePhone}
      handleMail={handleMail}
      handlePassword={handlePassword}
      handleProfileType={handleProfileType}
      handleProfilePicture={handleProfilePicture}
      handleSend={handleSend}
      name={name}
      cpf={cpf}
      birthday={birthday}
      cep={cep}
      estado={estado}
      cidade={cidade}
      bairro={bairro}
      logradouro={logradouro}
      numero={numero}
      complemento={complemento}
      phone={phone}
      email={email}
      password={password}
      profilePicture={profilePicture}
    />
  );
};
