'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const CarouselComponent = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 1,
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
        <div className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28">Item 1</div>
        <div className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28">Item 2</div>
        <div className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28">Item 3</div>
        <div className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28">Item 4</div>
        <div className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28">Item 5</div>
        <div className="w-40 h-24 bg-primary-3 rounded-xl sm:w-48 sm:h-28">Item 6</div>
      </Carousel>
    </div>
  );
};
