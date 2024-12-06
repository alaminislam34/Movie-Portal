import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import noMovie from "../assets/noMovies.jpg";
import { useLoaderData } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Favorite = () => {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/favorites")
      .then((res) => res.json())
      .then((data) => setFavorite(data));
  }, []);
  console.log(favorite);
  const handleDeleteFavorite = (id) => {
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setFavorite((prev) => prev.filter((m) => m._id !== id));
            }
          });
        }
      });
  };

  return (
    <div className="">
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
                      src={m.movie.poster}
                      alt=""
                    />
                  </div>
                  <div className="space-y-2 py-2 pr-2">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                      {m.movie.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                      {m.movie.genre.map((g, i) => (
                        <span key={i}>{g}, </span>
                      ))}
                    </p>
                    <div className="*:text-xs md:*:text-sm lg:*:text-base lg:grid grid-cols-2 justify-start items-center">
                      <p>{m.movie.duration} minute</p>
                      <p>
                        {m.movie.releaseYear < 2025
                          ? `Release Year: ${m.movie.releaseYear}`
                          : "Coming soon.."}
                      </p>
                    </div>
                    <div className="rating rating-md">
                      {Array.from({ length: 5 }, (_, index) => (
                        <input
                          key={index}
                          className={`mask mask-star-2 ${
                            index < m.movie.rating
                              ? "bg-orange-400"
                              : "bg-gray-300"
                          } `}
                        />
                      ))}
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
          <div>
            <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex justify-center items-center">
              <img src={noMovie} alt="" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorite;
