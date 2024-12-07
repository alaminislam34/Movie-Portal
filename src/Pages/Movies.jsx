import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";
import noMovie from "../assets/noMovies.jpg";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const Movies = () => {
  const { favorite, setFavorite, data, setData, list } =
    useContext(ProviderContext);
  const navigate = useNavigate();

  // const handleFavorite = (movie) => {
  //   const exit = favorite.find((m) => m._id === movie._id);
  //   if (!exit) {
  //     useEffect(() => {
  //       fetch("http://localhost:5000/favorites", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify({ user, movie }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);

  //           setFavorite([...favorite, movie]);
  //           toast(
  //             <div className="flex flex-row gap-2 items-center text-white text-base lg:text-lg">
  //               <IoMdCheckmarkCircle className="text-white text-lg" />
  //               <p>Add Favorite List</p>
  //             </div>,
  //             {
  //               position: "top-right",
  //               autoClose: 4000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "light",
  //               transition: Bounce,
  //               style: {
  //                 backgroundColor: "#55DD33",
  //               },
  //             }
  //           );
  //         });
  //     }, [setData]);
  //   } else {
  //     toast(
  //       <div className="flex flex-row gap-2 items-center text-white text-base lg:text-lg">
  //         <RxCrossCircled className="text-white text-lg" />
  //         <p>Already Movie Add</p>
  //       </div>,
  //       {
  //         position: "top-right",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //         style: {
  //           backgroundColor: "#FF0800",
  //         },
  //       }
  //     );
  //   }
  // };
  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="">
      {data.length > 0 ? (
        list === "grid" ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
            {data.slice(0, 8).map((movie) => (
              <div key={movie._id} className="bg-white shadow-xl rounded-lg">
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
                  <div className="flex flex-row items-center gap-2">
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
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {data.map((movie) => (
              <div
                key={movie._id}
                className="bg-white shadow-xl rounded-lg grid grid-cols-2 gap-2 md:gap-4 border"
              >
                <div className="rounded-t-lg h-[250px] md:h-[260px] lg:h-[300px]">
                  <img
                    className="object-cover bg-center bg-no-repeat w-full h-full rounded-l-lg"
                    src={movie.poster}
                    alt=""
                  />
                </div>
                <div className="p-3 md:p-4 flex flex-col justify-center items-center gap-4">
                  <h2 className="text-lg md:text-xl w-full font-semibold">
                    {movie.title}
                  </h2>
                  <div className="flex flex-row items-center gap-2 w-full">
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
                  <div className="">
                    <Link
                      to={`/viewDetails/${movie._id}`}
                      className="w-28 md:w-32 text-sm md:text-base py-1.5 md:py-2 border border-primary text-primary hover:text-white hover:bg-primary inline-block text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )
      ) : (
        <div>
          <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex justify-center items-center">
            <img src={noMovie} alt="" />
          </div>
        </div>
      )}
      <div className="my-12 flex justify-center items-center">
        <button
          onClick={() => navigate("/allMovies")}
          className="btn border-primary hover:bg-primary hover:text-white duration-500"
        >
          See All Movies
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Movies;
