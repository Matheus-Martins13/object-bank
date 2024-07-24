import { Categories } from '@/components/home-components/Categories';
import { Header } from '@/components/home-components/Header';
import { Sidebar } from '@/components/global-components/Sidebar';

export const Home = () => {
  return (
    <main
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
      }}
    >
      <Header />

      <div className="w-full flex justify-center md:justify-around">
        <Categories />
        <Sidebar />
      </div>
    </main>
  );
};
