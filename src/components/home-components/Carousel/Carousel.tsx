'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const CarouselComponent = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        ssr={true}
        infinite={true}
        responsive={responsive}
        centerMode={true}
      >
        <div className="w-40 h-24 bg-secondary rounded-xl">Item 1</div>
        <div className="w-40 h-24 bg-secondary rounded-xl">Item 2</div>
        <div className="w-40 h-24 bg-secondary rounded-xl">Item 3</div>
        <div className="w-40 h-24 bg-secondary rounded-xl">Item 4</div>
        <div className="w-40 h-24 bg-secondary rounded-xl">Item 5</div>
        <div className="w-40 h-24 bg-secondary rounded-xl">Item 6</div>
      </Carousel>
    </>
  );
};
