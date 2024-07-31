import { DrawerComponent } from './components/Drawer';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-16 bg-secondary text-red-200">
      <DrawerComponent />

      <ul id="navigation-md" className="flex p-2">
      <li className="mx-2">
          <Link href="/">Início</Link>
        </li>
        <li className="mx-2">
          <Link href="/profile">Perfil</Link>
        </li>
        <li className="mx-2">
          <Link href="/register-category">Cadastrar categoria</Link>
        </li>
        <li className="mx-2">
          <Link href="/register-subcategory">Cadastrar subcategoria</Link>
        </li>
        <li className="mx-2">
          <Link href="/register-user">Cadastrar usuário</Link>
        </li>
        <li className="mx-2">
          <Link href="/object/register-object">Cadastrar objeto</Link>
        </li>
      </ul>
    </nav>
  );
};
