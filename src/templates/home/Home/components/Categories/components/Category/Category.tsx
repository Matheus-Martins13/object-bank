import { Carousel } from './components';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import Link from 'next/link';

export const Category = ({ cat }: { cat: CategoryWithSubcategoriesDto }) => {
  return (
    <div className="my-10">
      <Link
        href={{
          pathname: '/category',
          query: { idCategory: cat.idCategory },
        }}
      >
        <h3 className="font-bold text-black">{cat.name}</h3>
      </Link>
      {cat.subcategory.length > 0 ? (
        cat.subcategory.map((subcategory) => (
          <Carousel key={cat.idCategory} carouselContent={subcategory.object} />
        ))
      ) : (
        <div className="text-black">Nenhum objeto encontrado</div>
      )}
    </div>
  );
};
