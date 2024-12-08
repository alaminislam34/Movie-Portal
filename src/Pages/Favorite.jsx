import noMovie from "../assets/noMovies.jpg";
import { useLoaderData } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import PageLoader from "../Components/PageLoader";

const Favorite = () => {
  const { user, loading } = useContext(ProviderContext);
  const [favorite, setFavorite] = useState([]);
  const favorites = useLoaderData();

  useEffect(() => {
    const userEmail = user.email;
    const favoriteMovie = favorites.filter((m) => m.email === userEmail);

    if (favoriteMovie.length > 0) {
      setFavorite(favoriteMovie);
      return;
    }
  }, [favorites, user.email]);

  const handleDeleteFavorite = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-portal-server-site.vercel.app/favorites/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setFavorite((prev) => prev.filter((m) => m._id !== id));
            }
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your Movie is save",
          icon: "info",
        });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <section className="w-11/12 mx-auto flex flex-col gap-6 md:gap-10 py-6 md:py-10 lg:py-12">
          <div className="flex justify-center flex-col items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2">
              MY FAVORITE MOVIES
            </h3>
            <div className="border-b-2 border-primary w-10"></div>
          </div>
          {favorite.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
              {favorite.map((m) => (
                <div
                  key={m._id}
                  className="flex flex-row justify-between shadow-lg "
                >
                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="">
                      <img
                        className="aspect-square object-cover bg-center bg-no-repeat rounded-t-lg"
                        src={m.poster}
                        alt=""
                      />
                    </div>
                    <div className="space-y-2 py-2 pr-2">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                        {m.genre.map((g, i) => (
                          <span key={i}>{g}, </span>
                        ))}
                      </p>
                      <div className="*:text-xs md:*:text-sm lg:*:text-base *:text-gray-500 lg:grid grid-cols-2 justify-start items-center">
                        <p>{m.runTime} minute</p>
                        <p>
                          {m.releaseYear < 2025
                            ? `Release Year: ${m.releaseYear}`
                            : "Coming soon.."}
                        </p>
                      </div>
                      <div className="rating rating-sm flex items-center">
                        <span>({m.rating} )</span>
                        {Array.from({ length: 10 }, (_, index) => {
                          const isFullStar = index < Math.floor(m.rating);
                          const isHalfStar =
                            index === Math.floor(m.rating) &&
                            m.rating % 1 >= 0.5;
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
                      <div className="w-full flex justify-start py-2">
                        <button
                          onClick={() => handleDeleteFavorite(m._id)}
                          className="py-1.5 lg:py-2 px-2 md:px-3 lg:px-4 text-xs md:text-base border border-primary duration-700 text-white bg-primary hover:bg-red-700 flex flex-row gap-2 justify-center items-center rounded-lg"
                        >
                          Delete <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              ))}
            </section>
          ) : (
            <div className="mb-12">
              <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex flex-col justify-center items-center">
                <img className="w-10/12 mx-auto" src={noMovie} alt="" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
                  No Favorite Movies ☹️‼️
                </h2>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Favorite;
