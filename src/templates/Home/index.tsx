import { Navbar } from '@/components/global-components';
import { Categories } from '@/components/home-components/Categories';

export const Home = () => {
  return (
    <main
      style={{
        backgroundColor: '#00518a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Navbar />
      <Categories />
    </main>
  );
};
