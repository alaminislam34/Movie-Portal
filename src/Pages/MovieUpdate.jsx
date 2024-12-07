import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";

const MovieUpdate = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      poster: "",
      director: "",
      actors: [],
      language: "",
      runTime: "",
      releaseYear: new Date().getFullYear(), // default year;
      genre: [],
      rating: "",
      summary: "",
    },
  });

  //   genre options
  const genres = [
    { value: "Action", label: "Action" },
    { value: "Horror", label: "Horror" },
    { value: "Drama", label: "Drama" },
    { value: "Adventure", label: "Adventure" },
    { value: "Comedy", label: "Comedy" },
    { value: "Thriller", label: "Thriller" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Romance", label: "Romance" },
  ];

  //   release year set
  const maxYear = 2050;
  const years = Array.from(
    { length: maxYear - 1900 + 1 },
    (_, i) => maxYear - i
  );

  // Movie Add handle
  const handleOnSubmit = (e) => {
    console.log(e);
    const updateMovie = e;
    const movieId = id;

    fetch(`https://movie-portal-server-site.vercel.app/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Movie Update Successfully",
            icon: "success",
          });
          reset();
        }
      });
  };

  return (
    <div className="flex justify-center items-center my-12 updateMovieInfo">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="p-4 md:p-6 rounded-lg flex flex-col gap-4 md:gap-6 w-10/12 md:w-10/12 lg:w-8/12 mx-auto border shadow-xl"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold my-2 md:my-4 text-center">
          Update Movie Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* title */}
          <label htmlFor="title" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">Movie Title</span>
            <input
              type="text"
              placeholder="Enter movie title"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title at least 2 character",
                },
              })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </label>
          {/* Movie Poster */}
          <label htmlFor="poster" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">Poster URL</span>
            <input
              type="text"
              placeholder="Enter poster url"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("poster", { required: "Poster URL is required" })}
            />
            {errors.poster && (
              <span className="text-red-500 text-sm">
                {errors.poster.message}
              </span>
            )}
          </label>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Movie Director */}
          <label htmlFor="director" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">
              Movie Director
            </span>
            <input
              type="text"
              placeholder="Enter director name"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("director", {
                required: "Movie director is required",
                minLength: {
                  value: 2,
                  message: "Director name at least 2 character",
                },
              })}
            />
            {errors.director && (
              <span className="text-red-500 text-sm">
                {errors.director.message}
              </span>
            )}
          </label>
          {/* Movie Actors */}
          <label htmlFor="actors" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">Actors Name</span>
            <input
              type="text"
              placeholder="Enter actors name"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("actors", {
                required: "Movie actors is required",
                minLength: {
                  value: 2,
                  message: "actors at least 2 character",
                },
              })}
            />
            {errors.actors && (
              <span className="text-red-500 text-sm">
                {errors.actors.message}
              </span>
            )}
          </label>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Movie Language */}
          <label htmlFor="language" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">
              Movie Language
            </span>
            <input
              type="text"
              placeholder="Enter movie language"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("language", {
                required: "Movie language is required",
                minLength: {
                  value: 2,
                  message: "at least 2 character",
                },
              })}
            />
            {errors.language && (
              <span className="text-red-500 text-sm">
                {errors.language.message}
              </span>
            )}
          </label>
          {/* Movie Runtime */}
          <label htmlFor="runtime" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">
              Movie Duration{" "}
              <span className="text-xs md:text-sm">( in minutes )</span>
            </span>
            <input
              type="number"
              placeholder="Enter movie duration"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("runTime", {
                required: "Movie duration is required",
                valueAsNumber: true,
                min: { value: 60, message: "duration at least 60 minutes" },
              })}
            />
            {errors.runTime && (
              <span className="text-red-500 text-sm">
                {errors.runTime.message}
              </span>
            )}
          </label>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Movie Release Year */}
          <label htmlFor="release year" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">
              Movie Release Year
            </span>
            <select
              type="number"
              placeholder="Enter movie duration"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("releaseYear", {
                required: "Release year is required",
              })}
            >
              {years.map((year, i) => (
                <option key={i}>{year}</option>
              ))}
            </select>
            {errors.releaseYear && (
              <span className="text-red-500 text-sm">
                {errors.releaseYear.message}
              </span>
            )}
          </label>
          {/* movie rating */}
          <label htmlFor="rating" className="flex flex-col gap-2">
            <span className="text-lg md:text-xl font-medium">Movie Rating</span>
            <input
              type="number"
              placeholder="Enter movie rating"
              className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("rating", {
                required: "Movie rating is required",
                valueAsNumber: true,
              })}
            />
            {errors.rating && (
              <span className="text-red-500 text-sm">
                {errors.rating.message}
              </span>
            )}
          </label>
        </div>
        {/* Movie Genre */}
        <label htmlFor="genre" className="flex flex-col gap-2">
          <span className="text-lg md:text-xl font-medium">Movie Genre</span>
          <Controller
            name="genre"
            control={control}
            rules={{ required: "Please select at least one genre." }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={genres}
                placeholder="Select or add genres"
                classNamePrefix="react-select"
                value={genres.filter((option) =>
                  field.value.includes(option.value)
                )}
                onChange={(selected) =>
                  field.onChange(
                    selected ? selected.map((option) => option.value) : []
                  )
                }
              />
            )}
          />
          {errors.genre && (
            <span className="text-red-500 text-sm">{errors.genre.message}</span>
          )}
        </label>
        {/* movie summary */}
        <label htmlFor="summary" className="flex flex-col gap-2">
          <span className="text-lg md:text-xl font-medium">Movie Title</span>
          <textarea
            type="text"
            cols={5}
            rows={5}
            placeholder="Enter movie title"
            className="py-1.5 md:py-2 px-3 md:px-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("summary", {
              required: "At least 10 character is required",
              minLength: {
                value: 20,
                message: "Summary must be at least 10 characters long",
              },
            })}
          />
          {errors.summary && (
            <span className="text-red-500 text-sm">
              {errors.summary.message}
            </span>
          )}
        </label>
        <div>
          <div className="w-full flex justify-end items-center mb-4">
            <button
              onClick={() => reset()}
              type="button"
              className=" underline text-primary font-medium"
            >
              Reset
            </button>
          </div>
          <div>
            <input
              type="submit"
              value="Update Movie"
              className="py-1.5 md:py-3 px-3 md:px-4 w-full bg-primary text-white hover:bg-red-700 duration-500 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieUpdate;
