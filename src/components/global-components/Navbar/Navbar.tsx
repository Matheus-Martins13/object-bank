import { Dropdown, DrawerComponent } from './components';

import Link from 'next/link';

import logo from '@/assets/logo.png';
import Image from 'next/image';
import './style.css';

export const Navbar = () => {
  const unig = true;

  const managementDropdown = [
    { name: 'Cadastrar coleção', link: '/collection/register' },
    { name: 'Cadastrar objeto', link: '/object/register' },
    { name: 'Painel de gerenciamento', link: '/management' },
  ];

  const userDropdown = [
    { name: 'Cadastrar usuário', link: '/user/register' },
    { name: 'Gerenciar usuários', link: '/user/management' },
  ];

  return (
    <nav
      className={`navbar flex items-center justify-between w-full p-4 sm:p-0 ${
        unig ? 'bg-secondary' : ''
      }`}
    >
      <DrawerComponent />
      <div className="hidden md:flex items-center">
        <Link href="/">Início</Link>
        <Dropdown name="Gerenciar" links={managementDropdown} />
        <Dropdown name="Usuários" links={userDropdown} />
      </div>
      {unig ?? <Image src={logo} alt="" width={130} className="p-2 me-4" />}
    </nav>
  );
};
