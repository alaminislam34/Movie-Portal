import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListMovies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="m-6 grid grid-cols-1 gap-4 md:gap-6">
      {data
        ? data.slice(0, 8).map((movie) => (
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
                <div className="">
                  <Link
                    to={`/viewDetails/${movie._id}`}
                    className="py-2 px-4 border-2 border-primary text-primary hover:text-white hover:bg-primary inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ListMovies;
