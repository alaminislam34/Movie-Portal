import Banner from "../Components/Banner";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { useContext } from "react";
import Movies from "./Movies";
import p1 from "../assets/partners/p1.jpg";
import p2 from "../assets/partners/p2.jpg";
import p3 from "../assets/partners/p3.jpg";
import p4 from "../assets/partners/p4.jpg";
import p5 from "../assets/partners/p5.jpg";
import p6 from "../assets/partners/p6.jpg";
import { RiSortDesc } from "react-icons/ri";
import { ProviderContext } from "../Provider/AuthContext";
import { useLoaderData } from "react-router-dom";
import { FaR } from "react-icons/fa6";
import { GoTriangleRight } from "react-icons/go";
import PageLoader from "../Components/PageLoader";

const Home = () => {
  const { data, setData, setList, list, loading, theme } =
    useContext(ProviderContext);
  const allData = useLoaderData();

  // genre movie
  const action = allData.filter((m) => m.genre.includes("Action"));
  const horror = allData.filter((m) => m.genre.includes("Horror"));
  const comedy = allData.filter((m) => m.genre.includes("Comedy"));
  const romance = allData.filter((m) => m.genre.includes("Romance"));
  const thriller = allData.filter((m) => m.genre.includes("Thriller"));
  const sci_fi = allData.filter((m) => m.genre.includes("Sci-Fi"));
  const adventure = allData.filter((m) => m.genre.includes("Adventure"));
  const Drama = allData.filter((m) => m.genre.includes("Drama"));

  const handleCategoriesMovies = (category) => {
    const categoryMovie = allData.filter((m) => m.genre.includes(category));
    setData(categoryMovie);
  };
  const handleSort = () => {
    const sorted = [...data].sort((a, b) => b.rating - a.rating);
    setData(sorted);
  };
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="h-full">
          <section className="bg-bgMovie w-full h-full py-12 bg-no-repeat bg-cover object-cover bg-center flex justify-center items-center">
            <Banner />
          </section>
          <section className="w-11/12 mx-auto my-12">
            <div className="flex flex-col justify-start items-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-left inline-block w-full py-4 border-b-2 border-primary">
                MOVIES CATEGORY
              </h3>
            </div>
            <div className="my-4 md:my-6 flex flex-wrap gap-4 *:border *:border-primary hover:*:bg-primary hover:*:text-white *:duration-500">
              <button
                onClick={() => setData(allData)}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> All{" "}
                {allData.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Action")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Action{" "}
                {action.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Comedy")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Comedy{" "}
                {comedy.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Drama")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Drama{" "}
                {Drama.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Horror")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Horror{" "}
                {horror.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Adventure")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Adventure{" "}
                {adventure.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Thriller")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Thriller{" "}
                {thriller.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Sci-fi")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Science
                Fiction {sci_fi.length}
              </button>
              <button
                onClick={() => handleCategoriesMovies("Romance")}
                className="py-1.5 md:py-2 px-3 md:px-4 border rounded flex flex-row gap-1 items-center"
              >
                <GoTriangleRight className="text-lg md:text-xl" /> Romance{" "}
                {romance.length}
              </button>
            </div>
          </section>
          <section className="w-11/12 mx-auto my-12">
            <div className="md:col-span-2 lg:col-span-3">
              <div
                className={`border-b-2 ${
                  theme === "dark" ? "border-primary" : ""
                } my-4 md:my-8 lg:my-12 md:mx-4 flex justify-between items-center`}
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-4 inline-block">
                  OUR FEATURED MOVIES
                </h3>
                <div className="flex flex-row gap-2 md:gap-4">
                  <button
                    onClick={handleSort}
                    className="py-1.5 px-2 md:py-2 md:px-3 rounded-lg border border-primary text-base md:text-xl tooltip tooltip-top"
                    data-tip="Sort by Rating"
                  >
                    <RiSortDesc />
                  </button>
                  <button
                    onClick={() => setList("grid")}
                    className={`py-1.5 px-2 md:py-2 md:px-3 rounded-lg duration-700 ${
                      list === "grid"
                        ? "bg-primary text-white"
                        : " text-primary"
                    } border text-base md:text-lg lg:text-xl`}
                  >
                    <IoGrid />
                  </button>
                  <button
                    onClick={() => setList("list")}
                    className={`py-1.5 px-2 md:py-2 md:px-3 rounded-lg duration-700 ${
                      list === "list"
                        ? "bg-primary text-white"
                        : " text-primary"
                    } border text-base md:text-lg lg:text-xl`}
                  >
                    <FaListUl />
                  </button>
                </div>
              </div>
              <Movies />
            </div>
          </section>

          {/* extra section 1 */}
          <section className="my-10 md:my-12 lg:my-16">
            <div className="flex justify-center flex-col items-center">
              <h3
                className={`text-xl md:text-2xl lg:text-3xl font-semibold py-2 border-b-2 ${
                  theme === "light" ? "border-primary" : ""
                }`}
              >
                OUR PARTNER'S
              </h3>
            </div>
            <div className="slider-container flex justify-center items-center">
              <div className="my-6 py-6 md:py-8 overflow-hidden w-11/12 mx-auto relative">
                <div
                  className={`absolute top-0 left-0 bg-gradient-to-l ${
                    theme === "light"
                      ? "from-white/0 via-white/60 to-white"
                      : theme === "dark"
                      ? "from-[#1D232A]/0 via-[#1D232A]/60 to-[#1D232A]"
                      : ""
                  } h-full w-36 z-10`}
                ></div>
                <div
                  className={`absolute top-0 right-0 bg-gradient-to-r ${
                    theme === "light"
                      ? "from-white/0 via-white/60 to-white"
                      : theme === "dark"
                      ? "from-[#1D232A]/0 via-[#1D232A]/60 to-[#1D232A]"
                      : ""
                  } h-full w-36 z-10`}
                ></div>
                <div className="slierContainer">
                  <div className="slider">
                    <div className="slide *:bg-white p-2">
                      <img src={p1} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p2} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p3} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p4} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p5} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p6} alt="" />
                    </div>

                    {/* slide clone */}
                    <div className="slide *:bg-white p-2">
                      <img src={p1} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p2} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p3} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p4} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p5} alt="" />
                    </div>
                    <div className="slide *:bg-white p-2">
                      <img src={p6} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
