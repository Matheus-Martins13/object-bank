import { Carousel } from '@/components/home-components/Carousel';
import { CategoryDto } from '@/dtos/category.dto';

export const Category = ({ cat }: { cat: CategoryDto }) => {
  return (
    <div className="my-10">
      <h3 className="font-bold text-black">{cat.name}</h3>
      <Carousel carouselContent={cat.objects} />
    </div>
  );
};
