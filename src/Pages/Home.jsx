import Banner from "../Components/Banner";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { useState } from "react";
import Movies from "./Movies";
import ListMovies from "../Components/ListMovies";
import p1 from "../assets/partners/p1.jpg";
import p2 from "../assets/partners/p2.jpg";
import p3 from "../assets/partners/p3.jpg";
import p4 from "../assets/partners/p4.jpg";
import p5 from "../assets/partners/p5.jpg";
import p6 from "../assets/partners/p6.jpg";

const Home = () => {
  const [list, setList] = useState("grid");
  const partners = [
    { p: p1 },
    { p: p2 },
    { p: p3 },
    { p: p4 },
    { p: p5 },
    { p: p6 },
  ];
  console.log(partners);

  return (
    <div className="mt-14">
      <section className="bg-bgMovie w-full h-[100vh] bg-no-repeat bg-cover object-cover bg-center flex justify-center items-center">
        <Banner />
      </section>
      <section className="w-11/12 mx-auto my-12">
        <div className="md:col-span-2 lg:col-span-3">
          <div className="border-b-2 my-4 md:my-8 lg:my-12 md:mx-4 flex justify-between items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-4 border-b-2 md:border-b-4 border-primary inline-block">
              OUR TOP MOVIES
            </h3>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => setList("grid")}
                className={`p-2 md:p-3 rounded-lg duration-700 ${
                  list === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } border text-lg md:text-xl`}
              >
                <IoGrid />
              </button>
              <button
                onClick={() => setList("list")}
                className={`p-2 md:p-3 rounded-lg duration-700 ${
                  list === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } border text-lg md:text-xl`}
              >
                <FaListUl />
              </button>
            </div>
          </div>
          {list === "grid" && <Movies />}
          {list === "list" && <ListMovies />}
        </div>
      </section>

      {/* extra section 1 */}
      <section className="my-10 md:my-12 lg:my-16">
        <div className="flex justify-center flex-col items-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2 border-b-2">
            OUR PARTNER'S
          </h3>
          <div className="border-b-4 border-primary w-10"></div>
        </div>
        <div className="slider-container flex justify-center items-center gap-4 border">
          <div className="border-2 my-6 md:my-8 overflow-hidden">
            <div className="slider">
              {partners.map((p, i) => (
                <div key={i} className="slide">
                  <img src={p.p} alt="" />
                </div>
              ))}
              {partners.map((p, i) => (
                <div key={i} className="slide">
                  <img src={p.p} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
