import { Carousel } from './components';
import { CollectionWithObjectsDto } from '@/dtos/collection.dto';
import Link from 'next/link';

export const Collection = ({
  collection,
}: {
  collection: CollectionWithObjectsDto;
}) => {
  return (
    <div className="my-10">
      <Link
        href={{
          pathname: '/collection',
          query: { idCollection: collection.idCollection },
        }}
      >
        <h3 className="font-bold text-black">{collection.name}</h3>
      </Link>
      <Carousel carouselContent={collection.object} />
    </div>
  );
};
