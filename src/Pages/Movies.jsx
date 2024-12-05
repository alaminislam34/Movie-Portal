import { Link, useLoaderData } from "react-router-dom";

const Movies = () => {
  const data = useLoaderData();
  return (
    <div className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {data
        ? data.map((movie) => (
            <div key={movie._id} className="bg-white shadow-xl rounded-lg p-4">
              <div className="relative group duration-500 overflow-hidden rounded-xl">
                <img
                  className="aspect-square object-cover bg-center bg-no-repeat w-full h-full"
                  src={movie.poster}
                  alt=""
                />
                <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-xl">
                  <div className="duration-500 bg-black/60 w-0 h-0 group-hover:w-full group-hover:h-full group-hover:flex justify-center items-center relative"></div>
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
              <h2 className="text-xl md:text-2xl my-2 font-semibold">
                {movie.title}
              </h2>
              <div className="flex flex-row items-center gap-2">
                <p className="text-lg md:text-xl">Genre: </p>
                <p className="flex flex-row items-center gap-2">
                  {movie.genre.map((g, i) => (
                    <p key={i} className=" text-primary font-bold">
                      {g}
                    </p>
                  ))}
                </p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Movies;
