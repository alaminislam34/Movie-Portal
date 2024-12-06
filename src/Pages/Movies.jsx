import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";
import noMovie from "../assets/noMovies.jpg";

const Movies = () => {
  const { favorite, setFavorite, data, setData, list } =
    useContext(ProviderContext);
  const navigate = useNavigate();
  console.log(favorite);

  const handleFavorite = (movie) => {
    setFavorite([...favorite, movie]);
  };
  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="">
      {data.length > 0 ? (
        list === "grid" ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.map((movie) => (
              <div key={movie._id} className="bg-white shadow-xl rounded-lg">
                <div className="relative group duration-500 overflow-hidden rounded-t-lg h-[300px] sm:h-[400px] md:h-[400px]">
                  <img
                    className="object-cover bg-center bg-no-repeat w-full h-full"
                    src={movie.poster}
                    alt=""
                  />
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
                    <button
                      onClick={() => handleFavorite(movie)}
                      className="w-32 md:w-36 py-1.5 md:py-2 text-sm md:text-base border-2 font-semibold backdrop-blur border-primary relative right-96 group-hover:right-0 duration-700 hover:text-white hover:bg-primary"
                    >
                      Add Favorite
                    </button>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h2 className="text-lg md:text-xl my-2 font-semibold">
                    {movie.title}
                  </h2>
                  <div className="flex flex-row items-center gap-2">
                    <p className="flex flex-wrap items-center gap-2">
                      {movie.genre.map((g, i) => (
                        <p
                          key={i}
                          className="text-primary font-medium text-xs md:text-sm"
                        >
                          {g}
                        </p>
                      ))}
                    </p>
                  </div>
                  <div className="rating rating-md">
                    {Array.from({ length: 5 }, (_, index) => (
                      <input
                        key={index}
                        className={`mask mask-star-2 ${
                          index < movie.rating ? "bg-orange-400" : "bg-gray-300"
                        } `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          data.map((movie) => (
            <div
              key={movie._id}
              className="bg-white shadow-xl rounded-lg grid grid-cols-1 md:grid-cols-3"
            >
              <div className="rounded-t-lg h-[300px] md:h-[400px] md:col-span-1">
                <img
                  className="object-cover bg-center bg-no-repeat w-full h-full"
                  src={movie.poster}
                  alt=""
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col justify-center gap-4 md:col-span-2">
                <h2 className="text-lg md:text-xl font-semibold">
                  {movie.title}
                </h2>
                <div className="flex flex-row items-center gap-2">
                  <p className="flex flex-wrap items-center gap-2">
                    {movie.genre.map((g, i) => (
                      <p
                        key={i}
                        className="text-gray-500 font-medium text-xs md:text-sm"
                      >
                        {g},
                      </p>
                    ))}
                  </p>
                </div>
                <p>{movie.summary.slice(0, 200)}...</p>
                <div className="flex flex-row justify-start gap-4">
                  <Link
                    to={`/viewDetails/${movie._id}`}
                    className="w-28 md:w-32 py-1.5 md:py-2 border border-primary text-primary hover:text-white hover:bg-primary inline-block text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleFavorite(movie)}
                    className="w-28 md:w-32 py-1.5 md:py-2 text-sm md:text-base border border-primary duration-700 text-primary hover:text-white hover:bg-primary"
                  >
                    Add Favorite
                  </button>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div>
          <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex justify-center items-center">
            <img src={noMovie} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
