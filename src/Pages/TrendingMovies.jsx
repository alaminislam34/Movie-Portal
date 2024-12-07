import t1 from "../assets/banner/b1.jpg";
import t2 from "../assets/banner/b2.jpg";
import t3 from "../assets/banner/b3.jpg";
import t4 from "../assets/banner/b4.jpg";
import t5 from "../assets/banner/b5.jpg";
import t6 from "../assets/banner/b6.jpg";
import t7 from "../assets/banner/b7.jpg";
import t8 from "../assets/banner/b8.jpg";
import t9 from "../assets/banner/b9.jpg";
import t10 from "../assets/banner/b10.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { useRef } from "react";
import { FiTriangle } from "react-icons/fi";

const TrendingMovies = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const images = [
    { b: t1 },
    { b: t2 },
    { b: t3 },
    { b: t4 },
    { b: t5 },
    { b: t6 },
    { b: t7 },
    { b: t8 },
    { b: t9 },
    { b: t10 },
  ];

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
    <div>
      <section className="grid grid-cols-1">
        <div className="bg-backImg">
          <div className="w-full h-full bg-black/50 py-6 md:py-10 lg:py-12">
            <div className="flex justify-center items-center mb-6 md:mb-12">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold py-3 inline border-b-2 border-primary text-white px-4">
                Trending Movie
              </h1>
            </div>
            <div class="_slide_1 ">
              <div class="slider-content">
                <div className="_slide">
                  <img src={t10} alt="" />
                </div>
                <div className="_slide">
                  <img src={t9} alt="" />
                </div>
                <div className="_slide">
                  <img src={t8} alt="" />
                </div>
                <div className="_slide">
                  <img src={t7} alt="" />
                </div>
                <div className="_slide">
                  <img src={t6} alt="" />
                </div>
                <div className="_slide">
                  <img src={t5} alt="" />
                </div>
                <div className="_slide">
                  <img src={t4} alt="" />
                </div>
                <div className="_slide">
                  <img src={t3} alt="" />
                </div>
                <div className="_slide">
                  <img src={t2} alt="" />
                </div>
                <div className="_slide">
                  <img src={t1} alt="" />
                </div>

                <div className="_slide">
                  <img src={t10} alt="" />
                </div>
                <div className="_slide">
                  <img src={t9} alt="" />
                </div>
                <div className="_slide">
                  <img src={t8} alt="" />
                </div>
                <div className="_slide">
                  <img src={t7} alt="" />
                </div>
                <div className="_slide">
                  <img src={t6} alt="" />
                </div>
                <div className="_slide">
                  <img src={t5} alt="" />
                </div>
                <div className="_slide">
                  <img src={t4} alt="" />
                </div>
                <div className="_slide">
                  <img src={t3} alt="" />
                </div>
                <div className="_slide">
                  <img src={t2} alt="" />
                </div>
                <div className="_slide">
                  <img src={t1} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="">
          <div className="h-[500px] w-full m-4 md:my-6 lg:my-12 relative">
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
              className="mySwiper h-full w-11/12 mx-auto"
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
        </div>
      </section>
    </div>
  );
};

export default TrendingMovies;
