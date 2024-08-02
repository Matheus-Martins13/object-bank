import { Dropdown } from './components';
import Link from 'next/link';

import './style.css';

export const Navbar = () => {
  const categoriesDropdown = [
    { name: 'Cadastrar categoria', link: '/category/register' },
    { name: 'Gerenciar categorias', link: 'category/management' },
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
    <nav className="navbar flex items-center justify-between">
      <div>
        <Link href="/">Início</Link>
        <Dropdown name="Categorias" links={categoriesDropdown} />
        <Dropdown name="Subcategorias" links={subcategoriesDropdown} />
        <Dropdown name="Usuários" links={userDropdown} />
        <Dropdown name="Objetos" links={objectDropdown} />
      </div>
      <div>TESTE</div>
    </nav>
  );
};
