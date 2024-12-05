import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="py-6 md:py-12 bg-base-300">
      <div className="flex justify-center flex-col items-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2">
          OUR LATEST MOVIES
        </h3>
        <div className="border-b-2 border-primary w-10"></div>
      </div>
      <div className="m-6 grid grid-cols-1 gap-4 md:gap-6">
        {data
          ? data.map((movie) => (
              <div
                key={movie._id}
                className="bg-white shadow-2xl rounded-lg grid grid-cols-1 md:grid-cols-3"
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
                  <p className="text-xs md:text-sm lg:text-base">
                    {movie.summary.slice(0, 300)}...
                  </p>
                  <div className="flex flex-row gap-4">
                    <div className="">
                      <Link
                        to={`/viewDetails/${movie._id}`}
                        className="py-2 md:px-4 px-3 text-sm md:text-base border duration-500 border-primary text-primary hover:text-white hover:bg-primary inline-block"
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        to={`/viewDetails/${movie._id}`}
                        className="py-2 md:px-4 px-3 text-sm md:text-base border duration-500 border-primary text-primary hover:text-white hover:bg-primary inline-block"
                      >
                        Add Favorite
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AllMovies;
