import { useLoaderData, useNavigate } from "react-router-dom";
import noMovie from "../assets/noMovies.jpg";
import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import PageLoader from "../Components/PageLoader";

const AllMovies = () => {
  const { loading, theme } = useContext(ProviderContext);
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="py-6 md:py-12">
          <div className="flex justify-center flex-col items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2">
              OUR LATEST MOVIES
            </h3>
            <div className="border-b-2 border-primary w-10"></div>
          </div>
          <div className="m-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-16">
            {data.length > 0 ? (
              data.map((movie) => (
                <div
                  key={movie._id}
                  className={`${
                    theme === "dark"
                      ? "bg-white/10 backdrop-blur-xl"
                      : theme === "light"
                      ? "shadow-xl bg-white/60"
                      : ""
                  } rounded-lg`}
                >
                  <div className="relative group duration-500 overflow-hidden rounded-t-lg ">
                    <div className="h-[300px] sm:h-[400px] md:h-[420px]">
                      <img
                        className="object-cover bg-center bg-no-repeat w-full h-full"
                        src={movie.poster}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                      <div className="duration-700 bg-black/50 w-0 h-0 group-hover:w-full group-hover:h-full group-hover:flex justify-center items-center relative"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-4 *:text-primary">
                      <button
                        onClick={() => navigate(`/viewDetails/${movie._id}`)}
                        className="w-32 md:w-36 py-1.5 md:py-2 text-sm md:text-base border-2 font-semibold backdrop-blur border-primary relative left-96 group-hover:left-0 duration-700 hover:text-white hover:bg-primary"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="px-4 pb-6">
                    <h2 className="text-lg md:text-xl my-2 font-semibold">
                      {movie.title}
                    </h2>
                    <div className="rating rating-sm flex items-center">
                      <span>({movie.rating} )</span>
                      {Array.from({ length: 10 }, (_, index) => {
                        const isFullStar = index < Math.floor(movie.rating);
                        const isHalfStar =
                          index === Math.floor(movie.rating) &&
                          movie.rating % 1 >= 0.5;
                        return (
                          <input
                            key={index}
                            className={`mask mask-star ${
                              isFullStar
                                ? "bg-orange-400"
                                : isHalfStar
                                ? "bg-orange-200"
                                : "bg-gray-300"
                            } `}
                          />
                        );
                      })}
                    </div>
                    <div className="flex flex-row items-center gap-2 py-2 mt-2 border-t">
                      <p className="flex flex-wrap items-center gap-2">
                        {movie.genre.map((g, i) => (
                          <p
                            key={i}
                            className="text-gray-500 font-medium text-xs md:text-sm"
                          >
                            {g}
                          </p>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="sm:col-span-2 lg:col-span-3 flex justify-center items-center">
                <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex justify-center items-center">
                  <img src={noMovie} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllMovies;
