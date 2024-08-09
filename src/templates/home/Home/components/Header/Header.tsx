import './style.css';

export const Header = () => {
  const unig = false;
  if (!unig) {
    return (
      <section id="header" className="w-full flex relative">
        <div id="home-top-video" className="w-full bg-gray-900">
          <video
            className="w-full"
            autoPlay={true}
            muted
            loop
            src="http://localhost:3001/video/header-video.mp4"
          ></video>
        </div>

        <div id="home-top-image"></div>

        <div
          id="text-header"
          className="absolute w-full flex flex-col items-center justify-center top-1/4"
        >
          <div className="flex flex-col items-center justify-center w-3/4 md:w-3/4 md:text-lg lg:w-1/3">
            <p className="text-center text-sm font-bold m-2 md:text-2xl text-white">
              Acervo digital da Editora Legacy. Construindo um legado.
            </p>
            <input className="m-2 md:w-3/4" type="text" />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="">
        <h1 className="text-4xl text-center mb-20 mt-10">
          LABORATÓRIO <br /> DE MATEMÁTICA
        </h1>
      </div>
    );
  }
};
