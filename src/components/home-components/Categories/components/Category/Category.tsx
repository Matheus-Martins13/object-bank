import { Carousel } from '@/components/home-components/Carousel';
import { CategoryWithSubcategoriesDto } from '@/dtos/category.dto';

export const Category = ({ cat }: { cat: CategoryWithSubcategoriesDto }) => {
  return (
    <div className="my-10">
      <h3 className="font-bold text-black">{cat.name}</h3>
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
