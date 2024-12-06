import { useContext } from "react";
import { FaBackward } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const data = useLoaderData();
  const { favorite, setFavorite, setData } = useContext(ProviderContext);
  const navigate = useNavigate();

  // handle favorite
  const handleFavorite = (movie) => {
    const exit = favorite.find((m) => m._id === movie._id);
    if (!exit) {
      // Make the API request directly
      fetch("https://movie-portal-server-site.vercel.app/favorites", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ movie }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // Update the favorite list
          // const exits = data
          setFavorite([...favorite, movie]);
          toast(
            <div className="flex flex-row gap-2 items-center text-white text-base lg:text-lg">
              <IoMdCheckmarkCircle className="text-white text-lg" />
              <p>Add Favorite List</p>
            </div>,
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              style: {
                backgroundColor: "#55DD33",
              },
            }
          );
        })
        .catch((err) => console.error("Error adding favorite:", err));
    } else {
      toast(
        <div className="flex flex-row gap-2 items-center text-white text-base lg:text-lg">
          <RxCrossCircled className="text-white text-lg" />
          <p>Already Movie Added</p>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          style: {
            backgroundColor: "#FF0800",
          },
        }
      );
    }
  };

  const {
    _id,
    poster,
    title,
    director,
    genre,
    rating,
    releaseYear,
    duration,
    summary,
  } = data;

  const handleDeleteMovie = (id) => {
    fetch(`https://movie-portal-server-site.vercel.app/movies/${id}`, {
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
              navigate("/allMovies");
              setData((prev) => prev.filter((m) => m._id !== id));
            }
          });
        }
      });
  };

  return (
    <div className=" my-4 md:my-6 w-11/12 mx-auto">
      <div className="my-4 md:my-6 flex justify-center items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold my-2 md:my-4 border-b-2 border-primary py-2">
          View <span className="text-primary">Movie</span> Details
        </h1>
      </div>
      <div className="flex justify-start items-center">
        <Link
          to="/"
          className="flex flex-row gap-2 items-center ml-2 md:ml-4 border text-xs md:text-sm lg:text-base border-primary py-1 px-2 rounded-lg duration-1000 text-white bg-primary hover:bg-red-700"
        >
          <FaBackward /> Back
        </Link>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8 p-2 md:p-4">
        <div className="md:col-span-3">
          <img
            className="w-full h-full object-cover bg-center"
            src={poster}
            alt=""
          />
        </div>
        <div className="md:col-span-2 flex justify-center items-center">
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {title}
            </h3>
            <h4 className="text-lg md:text-xl">
              Movie Director:{" "}
              <span className="italic font-medium">{director}</span>
            </h4>
            <p className="text-gray-600">
              <span className="font-medium">Category: </span>{" "}
              {genre.map((g, i) => (
                <span key={i} className="italic">
                  {" "}
                  {g},
                </span>
              ))}
            </p>
            <div className="rating rating-md">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index}
                  className={`mask mask-star-2 ${
                    index < rating ? "bg-orange-400" : "bg-gray-300"
                  } `}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 justify-start items-center">
              <p>Duration: {duration} minute</p>
              <p>
                {releaseYear < 2025
                  ? `Release Year: ${releaseYear}`
                  : "Coming Soon.."}
              </p>
            </div>
            <p>{summary}</p>
            <div className="flex flex-row justify-between gap-4">
              <button
                onClick={() => handleFavorite(data)}
                className="w-28 md:w-32 py-1.5 md:py-2 text-sm md:text-base border border-primary duration-700 text-primary hover:text-white hover:bg-primary rounded-lg"
              >
                Add Favorite
              </button>
              <button
                onClick={() => handleDeleteMovie(_id)}
                className="py-1.5 md:py-2 px-3 md:px-4 text-sm md:text-base border border-primary duration-700 text-white bg-primary hover:bg-red-700 flex flex-row gap-2 justify-center items-center rounded-lg"
              >
                Delete Movie <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewDetails;
