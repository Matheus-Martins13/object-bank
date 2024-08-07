import { Carousel } from './components';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';
import Link from 'next/link';

export const Category = ({ cat }: { cat: CategoryWithSubcategoriesDto }) => {
  return (
    <div className="my-10">
      {cat.subcategory.length > 0 ? (
        cat.subcategory.map((subcategory) => (
          <div key={cat.idCategory}>
            {subcategory.object.length > 0 && (
              <Link
                href={{
                  pathname: '/category',
                  query: { idCategory: cat.idCategory },
                }}
              >
                <h3 className="font-bold text-black">{cat.name}</h3>
              </Link>
            )}

            <Carousel carouselContent={subcategory.object} />
          </div>
        ))
      ) : (
        <div className="text-black">Nenhum objeto encontrado</div>
      )}
    </div>
  );
};
