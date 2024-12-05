import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FiTriangle } from "react-icons/fi";

const Banner = () => {
  const [images, setImages] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="h-[80vh] w-full my-4 relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={
          (true,
          {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          })
        }
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-full w-10/12 mx-auto"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <img
              className="w-11/12 mx-auto border-primary border h-full object-cover bg-center rounded-xl"
              src={image.poster}
              alt={image.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="custom-prev z-10 absolute left-8 top-1/2 transform -translate-y-1/2 w-10 md:w-16 md:h-16 h-10 bg-primary flex justify-center items-center text-white rounded-full text-lg md:text-xl lg:text-2xl duration-700 hover:bg-transparent hover:border-primary hover:text-primary border">
        <FiTriangle className="-rotate-90" />
      </button>
      <button className="custom-next z-10 absolute right-8 top-1/2 transform -translate-y-1/2 w-10 md:w-16 md:h-16 h-10 bg-primary flex justify-center items-center text-white rounded-full text-lg md:text-xl lg:text-2xl duration-700 hover:bg-transparent hover:border-primary hover:text-primary border">
        <FiTriangle className="rotate-90" />
      </button>
    </div>
  );
};

export default Banner;
