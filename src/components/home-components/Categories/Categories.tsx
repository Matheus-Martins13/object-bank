import { Carousel } from '@/components/home-components/Carousel';

export const Categories = () => {
  const categorias = [
    {
      idCategoria: 'hash1',
      name: 'Categoria 1',
    },
    {
      idCategoria: 'hash2',
      name: 'Categoria 2',
    },
    {
      idCategoria: 'hash3',
      name: 'Categoria 3',
    },
  ];
  return (
      <div className="w-11/12">
        {categorias.map((cat) => {
          return (
            <div key={cat.idCategoria} className="my-6">
              <h3 className="font-bold">{cat.name}</h3>
              <Carousel />
            </div>
          );
        })}
      </div>
  );
};
