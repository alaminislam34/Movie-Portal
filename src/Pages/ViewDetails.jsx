import { useContext, useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import PageLoader from "../Components/PageLoader";

const ViewDetails = () => {
  const data = useLoaderData();
  const { user, setData, loading, setId } = useContext(ProviderContext);
  const [favorites, setFavorite] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/favorites")
      .then((res) => res.json())
      .then((data) => setFavorite(data));
  }, []);
  // handle favorite
  const handleFavorite = (movie) => {
    const {
      poster,
      title,
      director,
      genre,
      rating,
      releaseYear,
      language,
      runTime,
      summary,
    } = movie;

    const email = user.email;
    const favorite = {
      poster,
      title,
      director,
      language,
      genre,
      email,
      rating,
      releaseYear,
      runTime,
      summary,
    };

    const exactMatch = favorites.some(
      (f) =>
        f.title.toLowerCase() === movie.title.toLowerCase() && f.email === email
    );

    if (favorites.length > 0) {
      if (exactMatch) {
        toast(
          <div className="flex flex-row gap-2 items-center  text-base lg:text-lg">
            <RxCrossCircled className="text-primary text-lg" />
            <p>Already Added </p>
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
          }
        );
      } else {
        fetch("https://movie-portal-server-site.vercel.app/favorites", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(favorite),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setFavorite((prev) => [...prev, favorite]);
              toast(
                <div className="flex flex-row gap-2 items-center text-base lg:text-lg">
                  <IoMdCheckmarkCircle className="text-green-500 text-lg" />
                  <p>Add to Favorite</p>
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
                }
              );
            }
          });
      }
    } else {
      toast(<p>Your Favorites list empty</p>);
    }
  };

  const {
    _id,
    poster,
    title,
    director,
    language,
    genre,
    rating,
    actors,
    releaseYear,
    runTime,
    summary,
  } = data;

  const handleDeleteMovie = (id) => {
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
                title: "Deleted!",
                text: "Your movie has been deleted.",
                icon: "success",
              });
              navigate("/allMovies");
              setData((prev) => prev.filter((m) => m._id !== id));
            }
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your movie is safe.",
          icon: "info",
        });
      }
    });
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
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
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 p-2 md:p-4">
            <div className="md:col-span-3">
              <img
                className="w-full h-full object-cover bg-center"
                src={poster}
                alt=""
              />
            </div>
            <div className="md:col-span-2 flex justify-start ">
              <div className="">
                {/* Movie details table */}
                <h2 className="border-t border-x border-gray-500 text-left py-3 md:py-4 text-xl md:text-2xl lg:text-3xl font-semibold px-3">
                  {title}
                </h2>
                <table className="table-auto">
                  <tbody className="">
                    <tr>
                      <td>Director: </td>
                      <td>{director}</td>
                    </tr>
                    <tr>
                      <td>Released:</td>
                      <td>
                        {releaseYear < 2025 ? releaseYear : "Coming soon"}
                      </td>
                    </tr>
                    <tr>
                      <td>Runtime: </td>
                      <td>{runTime} minute</td>
                    </tr>
                    <tr>
                      <td>Genre : </td>
                      <td>
                        {genre.map((g, i) => (
                          <span key={i}> {g}, </span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Actors: </td>
                      <td>{actors}</td>
                    </tr>
                    <tr>
                      <td>Language: </td>
                      <td>{language} </td>
                    </tr>
                    <tr>
                      <td>Rating: </td>
                      <td className="flex flex-row gap-2 items-center">
                        {rating} (<FaStar className="text-xs" />)
                      </td>
                    </tr>
                    <tr>
                      <td>Summary: </td>
                      <td>{summary}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex flex-wrap gap-4 mt-3 md:mt-4">
                  <button
                    onClick={() => handleFavorite(data)}
                    className="py-1.5 md:py-2 px-3 md:px-4 text-sm md:text-base border border-primary duration-700 text-primary hover:text-white hover:bg-primary rounded-lg"
                  >
                    Add Favorite
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/updateMovie/${_id}`);
                      setId(_id);
                    }}
                    className="py-1.5 md:py-2 px-3 md:px-4 text-sm md:text-base border border-primary duration-700 text-primary hover:text-white hover:bg-primary rounded-lg"
                  >
                    Update Movie
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
            <ToastContainer />
          </section>
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default ViewDetails;
