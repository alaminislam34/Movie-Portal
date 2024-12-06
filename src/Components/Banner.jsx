import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FiTriangle } from "react-icons/fi";
import b1 from "../assets/banner/b1.jpg";
import b2 from "../assets/banner/b2.jpg";
import b3 from "../assets/banner/b3.jpg";
import b4 from "../assets/banner/b4.jpg";
import b5 from "../assets/banner/b5.jpg";
import b6 from "../assets/banner/b6.jpg";
import b7 from "../assets/banner/b7.jpg";
import b8 from "../assets/banner/b8.jpg";
import b9 from "../assets/banner/b9.jpg";
import b10 from "../assets/banner/b10.jpg";

const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const images = [
    { b: b1 },
    { b: b2 },
    { b: b3 },
    { b: b4 },
    { b: b5 },
    { b: b6 },
    { b: b7 },
    { b: b8 },
    { b: b9 },
    { b: b10 },
  ];
  console.log(images);

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
    <div className="h-[500px] w-full md:my-4 relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
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
        className="mySwiper h-full w-11/12 md:w-10/12 mx-auto"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="h-full w-full relative">
            <img
              className="w-11/12 mx-auto h-full object-cover bg-center rounded-xl"
              src={image.b}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={prevRef}
        className="custom-prev z-[1] absolute left-8 top-1/2 transform -translate-y-1/2 w-10 md:w-16 md:h-16 h-10 bg-primary flex justify-center items-center text-white rounded-full text-lg md:text-xl lg:text-2xl duration-700 hover:bg-transparent hover:border-primary hover:text-primary border"
      >
        <FiTriangle className="-rotate-90" />
      </button>
      <button
        ref={nextRef}
        className="custom-next z-[1] absolute right-8 top-1/2 transform -translate-y-1/2 w-10 md:w-16 md:h-16 h-10 bg-primary flex justify-center items-center text-white rounded-full text-lg md:text-xl lg:text-2xl duration-700 hover:bg-transparent hover:border-primary hover:text-primary border"
      >
        <FiTriangle className="rotate-90" />
      </button>
    </div>
  );
};

export default Banner;
