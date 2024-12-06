import { Link, useLoaderData } from "react-router-dom";

const ViewDetails = () => {
  const data = useLoaderData();

  // handle favorite
  const handleFavorite = (movie) => {
    const exit = favorite.find((m) => m._id === movie._id);
    if (!exit) {
      // Make the API request directly
      fetch("http://localhost:5000/favorites", {
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
    poster,
    summary,
    rating,
    title,
    genre,
    releaseYear,
    duration,
    director,
  } = data;
  return (
    <div className=" my-4 md:my-6 w-11/12 mx-auto">
      <div className="my-4 md:my-6 flex justify-center items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold my-2 md:my-4">
          View <span className="text-primary">Movie</span> Details
        </h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2 md:p-4 border">
        <div className="md:col-span-3 aspect-square">
          <img
            className="w-full h-full object-cover bg-center"
            src={poster}
            alt=""
          />
        </div>
        <div className="md:col-span-2">
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
                <span key={i}> {g}</span>
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
          </div>
          <button
            onClick={() => handleFavorite(movie)}
            className="w-28 md:w-32 py-1.5 md:py-2 text-sm md:text-base border border-primary duration-700 text-primary hover:text-white hover:bg-primary"
          >
            Add Favorite
          </button>
        </div>
      </section>
    </div>
  );
};

export default ViewDetails;
