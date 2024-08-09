'use client';

import { useAuthContext } from '@/context/authContext';
import { Dropdown, DrawerComponent } from './components';

import Link from 'next/link';

import logo from '@/assets/logo.png';
import Image from 'next/image';

import { Login } from '@/templates';

import './style.css';

export const Navbar = () => {
  const { logged, payload, signOut } = useAuthContext();

  const unig = true;

  const types = [
    { name: 'image', value: 'Imagens' },
    { name: 'video', value: 'Vídeos' },
    { name: 'illustrations', value: 'Ilustrações' },
    { name: 'book', value: 'Livros' },
    { name: 'presentation', value: 'Apresentações' },
    { name: 'audio', value: 'Áudios' },
  ];

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

        {types.map((type: any) => {
          return (
            <Link
              href={{
                pathname: '/type',
                query: { type: type.name },
              }}
            >
              {type.value}
            </Link>
          );
        })}

        <div className="flex self-end">
          <Dropdown name="Gerenciar" links={managementDropdown} />
          <Dropdown name="Usuários" links={userDropdown} />
        </div>
      </div>
      <button onClick={signOut} className="text-white me-4">
        Sair
      </button>
      {unig ?? <Image src={logo} alt="" width={130} className="p-2 me-4" />}
    </nav>
  );
};
//   if (logged) {
//     if (payload.type === 'ADMINISTRADOR') {
//       return (
//         <nav
//           className={`navbar flex items-center justify-between w-full p-4 sm:p-0 ${
//             unig ? 'bg-secondary' : ''
//           }`}
//         >
//           <DrawerComponent />
//           <div className="hidden md:flex items-center">
//             <Link href="/">Início</Link>

//             {types.map((type: any) => {
//               return (
//                 <Link
//                   href={{
//                     pathname: '/type',
//                     query: { type: type.name },
//                   }}
//                 >
//                   {type.value}
//                 </Link>
//               );
//             })}

//             <Dropdown name="Gerenciar" links={managementDropdown} />
//             <Dropdown name="Usuários" links={userDropdown} />
//           </div>
//           <button onClick={signOut} className='text-white me-4'>Sair</button>
//           {unig ?? <Image src={logo} alt="" width={130} className="p-2 me-4" />}
//         </nav>
//       );
//     } else {
//       return (
//         <nav
//           className={`navbar flex items-center justify-between w-full p-4 sm:p-0 ${
//             unig ? 'bg-secondary' : ''
//           }`}
//         >
//           <DrawerComponent />
//           <div className="hidden md:flex items-center">
//             <Link href="/">Início</Link>

//             {types.map((type: any) => {
//               return (
//                 <Link
//                   href={{
//                     pathname: '/type',
//                     query: { type: type.name },
//                   }}
//                 >
//                   {type.value}
//                 </Link>
//               );
//             })}
//           </div>
//           <button onClick={signOut} className="text-white me-4">Sair</button>
//           {unig ?? <Image src={logo} alt="" width={130} className="p-2 me-4" />}
//         </nav>
//       );
//     }
//   } else {
//     return (
//       <nav
//         className={`navbar flex items-center justify-between w-full p-4 sm:p-0 ${
//           unig ? 'bg-secondary' : ''
//         }`}
//       >
//         <DrawerComponent />
//         <div className="hidden md:flex items-center">
//           <Link href="/">Início</Link>

//           {types.map((type: any) => {
//             return (
//               <Link
//                 href={{
//                   pathname: '/type',
//                   query: { type: type.name },
//                 }}
//               >
//                 {type.value}
//               </Link>
//             );
//           })}
//         </div>
//         <Login />
//         {unig ?? <Image src={logo} alt="" width={130} className="p-2 me-4" />}
//       </nav>
//     );
//   }
// };
