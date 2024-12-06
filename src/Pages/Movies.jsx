import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="md:m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {data
        ? data.slice(0, 8).map((movie) => (
            <div key={movie._id} className="bg-white shadow-xl rounded-lg">
              <div className="relative group duration-500 overflow-hidden rounded-t-lg h-[300px] sm:h-[400px] md:h-[400px]">
                <img
                  className="object-cover bg-center bg-no-repeat w-full h-full"
                  src={movie.poster}
                  alt=""
                />
                <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                  <div className="duration-500 bg-black/50 w-0 h-0 group-hover:w-full group-hover:h-full group-hover:flex justify-center items-center relative"></div>
                </div>
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
                  <Link
                    to={`/viewDetails/${movie._id}`}
                    className="py-2 px-4 border-2 border-primary text-primary hover:text-white hover:bg-primary duration-1000 relative left-72 group-hover:left-0"
                  >
                    View Details
                  </Link>
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
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Movies;
