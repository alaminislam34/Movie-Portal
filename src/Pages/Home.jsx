import { Outlet } from "react-router-dom";
import Banner from "../Components/Banner";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { useState } from "react";
import Movies from "./Movies";
import ListMovies from "../Components/ListMovies";

const Home = () => {
  const [list, setList] = useState("grid");
  return (
    <div className="">
      <section className="bg-bgMovie w-full h-[100vh] bg-no-repeat bg-cover object-cover bg-center flex justify-center items-center">
        <Banner />
      </section>
      <section className="border w-11/12 mx-auto my-12">
        <div className="md:col-span-2 lg:col-span-3 border">
          <div className="border-b-2 my-4 md:my-8 lg:my-12 mx-4 flex justify-between items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-4 border-b-2 border-primary inline-block">
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
    </div>
  );
};

export default Home;
