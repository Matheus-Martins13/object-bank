import { Dropdown, DrawerComponent } from './components';

import Link from 'next/link';

import logo from '@/assets/logo.png';
import Image from 'next/image';
import './style.css';

export const Navbar = () => {
  const categoriesDropdown = [
    { name: 'Cadastrar categoria', link: '/category/register' },
    { name: 'Gerenciar categorias', link: '/category/management' },
  ];
  const subcategoriesDropdown = [
    { name: 'Cadastrar subcategoria', link: '/subcategory/register' },
    { name: 'Gerenciar categorias', link: '/subcategory/management' },
  ];
  const userDropdown = [
    { name: 'Cadastrar usuário', link: '/user/register' },
    { name: 'Gerenciar usuários', link: '/user/management' },
  ];
  const objectDropdown = [
    { name: 'Cadastrar objeto', link: '/object/register' },
    { name: 'Gerenciar objetos', link: '/object/management' },
  ];

  return (
    <nav className="navbar flex items-center justify-between w-full p-4 sm:p-0">
      <DrawerComponent />
      <div className="hidden md:flex items-center">
        <Link href="/">Início</Link>
        <Dropdown name="Categorias" links={categoriesDropdown} />
        <Dropdown name="Subcategorias" links={subcategoriesDropdown} />
        <Dropdown name="Usuários" links={userDropdown} />
        <Dropdown name="Objetos" links={objectDropdown} />
      </div>
      <Image src={logo} alt="" width={130} className="p-2 me-4" />
    </nav>
  );
};
