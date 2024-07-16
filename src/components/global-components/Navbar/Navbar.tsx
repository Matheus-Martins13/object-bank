import { DrawerComponent } from './components/Drawer';

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-16 bg-primary-2 text-red-200">
      <DrawerComponent />
      <p className="pe-2">Banco de Objetos</p>
    </nav>
  );
};
