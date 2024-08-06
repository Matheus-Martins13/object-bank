'use client';

import { ObjectDto } from '@/dtos/object.dto';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const CarouselComponent = ({
  carouselContent,
}: {
  carouselContent: ObjectDto[];
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel
        transitionDuration={500}
        arrows={false}
        ssr={true}
        infinite={true}
        responsive={responsive}
        centerMode={true}
      >
        {carouselContent.map((obj) => {
          return (
            <Link
              href={{
                pathname: "/object",
                query: { idObject: obj.idObject }
              }}
              key={obj.idObject}
              className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28 md:w-52 md:h-32 block"
              style={{
                backgroundImage: `url(${obj.objectPicture.path})`,
                backgroundSize: 'contain',
              }}
            ></Link>
          );
        })}
      </Carousel>
    </div>
  );
};
