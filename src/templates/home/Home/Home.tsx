import { Categories, Header } from './components';
import { Sidebar } from '@/components/global-components/';

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
