'use client';

import { useState, useContext } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { FaAlignJustify } from 'react-icons/fa6';
import { AuthContext } from '@/context/authContext';

export const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(AuthContext);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div key={Math.random()} className="md:hidden">
      <button className="ps-2" onClick={toggleDrawer}>
        <FaAlignJustify />
      </button>
      <Drawer
        duration={300 * 2}
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
        style={{
          backgroundColor: "#00518a",
          transform:""
        }}
      >
        <div className='flex flex-col items-start justify-center ms-6 mt-6'>
          <h3 className="mt-2 font-bold">Bem vindo(a), {user.name}!</h3>
          <div className='flex my-2 items-center'>
            <p>Perfil</p>
            <p className="mx-2">|</p>
            <p>Meus objetos</p>
          </div>

          <span className=''>______</span>
        </div>
      </Drawer>
    </div>
  );
};

