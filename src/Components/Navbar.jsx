import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Line, RiMovie2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";

const Navbar = () => {
  const { user, handleLogoutUser, data, setData } = useContext(ProviderContext);
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://movie-portal-server-site.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, []);

  const handleSearchMovies = (value) => {
    const input = value.target.value.toLowerCase();
    const movie = allData.filter((m) => m?.title.toLowerCase().includes(input));
    setData(movie);
  };

  return (
    <div className="h-14 md:h-20 lg:h-[88px]">
      <div className="bg-primary fixed top-0 left-0 w-full z-50">
        <nav className="grid grid-cols-2 md:grid-cols-3 justify-center items-center md:py-4 py-2 text-white max-w-7xl mx-auto px-2">
          <div className="flex items-center sm:gap-1 drawer-end z-10">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="drawer-button cursor-pointer bg-[#d12222] text-white duration-700 sm:py-1 sm:px-2 md:py-2 flex justify-center items-center md:px-4 rounded-md"
              >
                <RiMenu2Line className="text-xl md:text-xl lg:text-2xl" />
              </label>
            </div>
            <div className="drawer-content">
              <button className="static drawer-button"></button>
            </div>
            <h2
              onClick={() => navigate("/")}
              className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-1 cursor-pointer"
            >
              <RiMovie2Fill /> MovieNest
            </h2>
            <div className="drawer-side z-40">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="p-4 md:p-6 flex flex-col min-h-full translate-x-6 hover:text-primary md:w-1/3 bg-white/80 text-primary overflow-hidden">
                <h2 className="flex flex-row gap-1 items-center text-xl md:text-2xl lg:text-3xl font-bold">
                  <RiMovie2Fill /> MovieNest
                </h2>
                <ul
                  className="*:text-base *:md:text-lg flex flex-col gap-2 md:gap-3 lg:gap-4 p-4 md:p-6 my-4 md:my-6 
              *:font-semibold *:py-2"
                >
                  <NavLink className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black">
                    Home
                  </NavLink>
                  <NavLink
                    to="/allMovies"
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    All Movies
                  </NavLink>

                  <NavLink
                    to="/addMovie"
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Add Movie
                  </NavLink>

                  <NavLink
                    to="/trendingMovies"
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Trending Movies
                  </NavLink>

                  <NavLink
                    to="/favorite"
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    My Favorites
                  </NavLink>

                  <NavLink
                    to="/userProfile"
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Profile
                  </NavLink>
                </ul>
                <button
                  onClick={handleLogoutUser}
                  className="w-full hover:bg-transparent text-white border border-primary duration-1000 hover:text-primary bg-primary py-1.5 md:py-2 mb-2"
                >
                  log out
                </button>
                <div className="md:hidden">
                  <input
                    onChange={handleSearchMovies}
                    type="text"
                    name="search"
                    className="w-full py-1.5 md:py-2 px-2 md:px-4 text-black bg-transparent border rounded-lg border-primary outline-none"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex w-full flex-row items-center justify-center gap-8 *:font-semibold relative hidden">
            <div className="w-full">
              <input
                onChange={handleSearchMovies}
                type="text"
                name="search"
                className="w-full py-2 lg:py-3 px-4 text-primary rounded-lg bg-white backdrop-blur-xl border-none outline-none"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex flex-row relative justify-end">
            {user ? (
              <div
                onClick={() => setShow(!show)}
                className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 tooltip tooltip-left bg-white rounded-full z-[10]"
                data-tip={user ? user.email : ""}
              >
                <img
                  src={user.photoURL}
                  className="w-full h-full object-cover bg-center rounded-full border border-red-500 cursor-pointer"
                />
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="py-1.5 md:py-2 px-2 md:px-4 bg-[#d12222] rounded-md text-sm md:text-base"
              >
                SignIn
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
