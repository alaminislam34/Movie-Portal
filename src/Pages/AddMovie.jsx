import { useState } from "react";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

const AddMovie = () => {
  const [selectGenres, setSelectGenres] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedCountries, setSelectedCountries] = useState();
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);

  // select options
  const options = [
    { value: "Comedy", label: "Comedy" },
    { value: "Horror", label: "Horror" },
    { value: "Sci-fi", label: "Sci-Fi" },
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Thriller", label: "Thriller" },
  ];

  // countries options
  const countries = [
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "China", label: "China" },
    { value: "Japan", label: "Japan" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Spain", label: "Spain" },
    { value: "Russia", label: "Russia" },
    { value: "Brazil", label: "Brazil" },
    { value: "South Africa", label: "South Africa" },
    { value: "Argentina", label: "Argentina" },
    { value: "Mexico", label: "Mexico" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Family", label: "Family" },
  ];

  const handleImage = (url) => {
    const imageUrlPattern = /\.(jpeg|jpg|gif|png|webp|bmp)$/i;
    return imageUrlPattern.test(url);
  };
  const handleGenres = (selectedOptions) => {
    setSelectGenres(selectedOptions);
  };

  const endYear = 2030;
  const years = Array.from(
    { length: endYear - 1900 + 1 },
    (_, i) => endYear - i
  );
  const yearOptions = years.map((year) => ({ value: year, label: year }));
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };
  const countriesOptions = countries;
  const handleCountriesSelect = (selectedOption) => {
    setSelectedCountries(selectedOption);
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
  };
  const handleAddMovie = (e) => {
    e.preventDefault();
    const form = e.target;
    const poster = form.poster.value;
    const director = form.director.value;
    if (director.length < 3) {
      setError("director");
      return;
    }
    const language = form.language.value;
    if (language.length < 3) {
      setError("language");
      return;
    }
    const country = selectedCountries.value;

    const budget = form.budget.value;

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
      director,
      language,
      country,
      budget,
      email,
      genre,
      duration,
      releaseYear,
      rating,
      summary,
    };
    console.log(movie);

    fetch("https://movie-portal-server-site.vercel.app/movies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((result) => {
        console.log(result);
        if (result) {
          Swal.fire({
            title: "Success!",
            text: "Movies Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          form.reset();
          setSelectGenres(null);
          setSelectedYear(null);
          setRating(0);
        }
      })
      .catch(() => {});
  };

  return (
    <div className="flex justify-center items-center bg-movie object-cover bg-no-repeat bg-center w-full h-full">
      <div className="md:w-9/12 w-11/12 mx-auto h-full">
        <form
          onSubmit={handleAddMovie}
          className="p-2 md:p-6 rounded-lg my-12  flex flex-col gap-2 bg-black/40 backdrop-blur-md text-white h-full w-full "
        >
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center my-4">
            Add Movie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 mb-2">
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Movie Poster
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="text"
                name="poster"
                onInput={handlePosterUrl}
                required
              />
              {error === "poster" ? (
                <small className="text-red-500 my-1 text-left">
                  Please enter a valid image URL (e.g., .jpg, .png)
                </small>
              ) : (
                " "
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Movie Title
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="text"
                name="title"
                required
              />
              {error === "title" ? (
                <small className="text-red-500 my-1 text-left">
                  Title must be 2 character.
                </small>
              ) : (
                " "
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Movie Director
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="text"
                name="director"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Language
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="text"
                name="language"
                required
              />
            </label>
            {/* <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Country
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="text"
                name="country"
                required
              />
            </label> */}
            {/* countries */}
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Release Year
              <Select
                options={countriesOptions}
                onChange={handleCountriesSelect}
                placeholder="Select a country"
                isClearable
                className="basic-select border text-white"
                classNamePrefix="select"
                required
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    padding: "6px 10px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
                    border: "none",
                    "border:focus": "none",
                    color: "white",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    color: "#000000",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                }}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Budget
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="number"
                name="budget"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Your Email
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="email"
                name="email"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Movie Duration
              <input
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                type="number"
                name="duration"
                required
              />
              {error === "duration" ? (
                <small className="text-red-500 my-1 text-left">
                  Duration must be greater than 60
                </small>
              ) : (
                " "
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
              Release Year
              <Select
                options={yearOptions}
                onChange={handleYearChange}
                placeholder="Select a year"
                isClearable
                className="basic-select border text-white"
                classNamePrefix="select"
                required
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    padding: "6px 10px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
                    border: "none",
                    "border:focus": "none",
                    color: "white",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    color: "#000000",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                }}
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
            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg md:col-span-2">
              Genre
              <Select
                isMulti
                name="genre"
                options={options}
                className="basic-multi-select border"
                classNamePrefix="select"
                onChange={handleGenres}
                required
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    padding: "6px 10px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
                    border: "none",
                    "border:focus": "none",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    color: "#000000",
                  }),
                }}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm md:text-base lg:text-lg md:col-span-2">
              Summary
              <textarea
                className="py-1.5 md:py-2 px-3 md:px-4 bg-transparent shadow-inner border focus:border-primary outline-none"
                name="summary"
                required
                rows={5}
                cols={5}
              ></textarea>
              {error === "summary" && (
                <small className="text-red-600 text-left my-1">
                  Summary must be at least 10 character
                </small>
              )}
            </label>
          </div>
          <button type="submit" className="btn">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
