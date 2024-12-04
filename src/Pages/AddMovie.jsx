import { useState } from "react";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";

const AddMovie = () => {
  const [selectGenres, setSelectGenres] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);

  console.log(error, rating);
  // select options
  const options = [
    { value: "Comedy", label: "Comedy" },
    { value: "Horror", label: "Horror" },
    { value: "Sci-fi", label: "Sci-Fi" },
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
    { value: "Action", label: "Action" },
  ];

  const handleImage = (url) => {
    const imageUrlPattern = /\.(jpeg|jpg|gif|png|webp|bmp)$/i;
    return imageUrlPattern.test(url);
  };
  const handleGenres = (selectedOptions) => {
    setSelectGenres(selectedOptions);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );
  const yearOptions = years.map((year) => ({ value: year, label: year }));
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handlePosterUrl = (e) => {
    const url = e.target.value;
    if (handleImage(url)) {
      setError("");
    } else {
      setError("poster");
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating);
  };
  const handleAddMovie = (e) => {
    e.preventDefault();
    const form = e.target;
    const poster = form.poster.value;
    if (handleImage(poster)) {
      setError("");
    } else {
      setError("poster");
      return;
    }
    const title = form.title.value;
    if (title.length < 2) {
      setError("title");
      return;
    } else {
      setError("");
    }
    const genre = selectGenres ? selectGenres.map((g) => g.value) : [];
    const releaseYear = selectedYear.value;
    const email = form.email.value;
    const duration = form.duration.value;
    if (duration < 60) {
      setError("duration");
      return;
    } else {
      setError("");
    }
    if (rating <= 0) {
      setError("rating");
      return;
    } else {
      setError("");
    }
    const summary = form.summary.value;
    if (summary.length < 20) {
      setError("summary");
      return;
    } else {
      setError("");
    }
    const movie = {
      poster,
      title,
      email,
      genre,
      duration,
      releaseYear,
      rating,
      summary,
    };
    console.log(movie);
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleAddMovie}
        className="p-4 md:p-6 rounded-lg my-12 flex flex-col gap-2 bg-base-300 md:w-6/12 w-10/12 mx-auto"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center my-2">
          Add Movie
        </h2>
        <label className="flex flex-col">
          Movie Poster
          <input type="text" name="poster" onInput={handlePosterUrl} required />
          {error === "poster" ? (
            <small className="text-red-500 my-1 text-left">
              Please enter a valid image URL (e.g., .jpg, .png)
            </small>
          ) : (
            " "
          )}
        </label>
        <label className="flex flex-col">
          Movie Title
          <input type="text" name="title" required />
          {error === "title" ? (
            <small className="text-red-500 my-1 text-left">
              Title must be 2 character.
            </small>
          ) : (
            " "
          )}
        </label>
        <label className="flex flex-col">
          Your Email
          <input type="email" name="email" required />
        </label>
        <label className="flex flex-col">
          Genre
          <Select
            isMulti
            name="genre"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleGenres}
            required
          />
        </label>
        <label className="flex flex-col">
          Movie Duration
          <input type="number" name="duration" required />
          {error === "duration" ? (
            <small className="text-red-500 my-1 text-left">
              Duration must be greater than 60
            </small>
          ) : (
            " "
          )}
        </label>
        <label className="flex flex-col">
          Release Year
          <Select
            options={yearOptions}
            onChange={handleYearChange}
            placeholder="Select a year"
            isClearable
            className="basic-select"
            classNamePrefix="select"
            required
          />
        </label>

        <div>
          Rating
          <div
            style={{
              direction: "ltr",
              fontFamily: "sans-serif",
              touchAction: "none",
            }}
          >
            <Rating
              fillColorArray={[
                "#f14f45",
                "#f16c45",
                "#f18845",
                "#f1b345",
                "#f1d045",
              ]}
              onClick={handleRating}
              transition
            />
          </div>
          {error === "rating" ? (
            <small className="text-red-600 text-left my-1">
              Please select a rating before submitting.
            </small>
          ) : (
            ""
          )}
        </div>
        <label className="flex flex-col">
          Summary
          <textarea name="summary" required rows={5} cols={5}></textarea>
          {error === "summary" && (
            <small className="text-red-600 text-left my-1">
              Summary must be at least 10 character
            </small>
          )}
        </label>
        <button type="submit" className="btn">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
