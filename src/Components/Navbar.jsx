import React, { useContext, useState } from "react";
import { RiMenu2Line, RiMovie2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";

const Navbar = () => {
  const { user, handleLogoutUser } = useContext(ProviderContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-primary">
      <nav className="grid grid-cols-2 md:grid-cols-3 justify-center items-center md:py-4 py-2 text-white max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-1 drawer-end z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="drawer-button cursor-pointer bg-[#d12222] text-white duration-700 py-1 md:py-2 flex justify-center items-center px-2 md:px-4 rounded-md"
            >
              <RiMenu2Line className="text-lg md:text-xl lg:text-2xl" />
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
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="p-4 md:p-6 flex flex-col min-h-full translate-x-6 hover:text-primary md:w-1/3 bg-white/80 text-primary overflow-hidden">
              <h2 className="flex flex-row gap-1 items-center text-xl md:text-2xl lg:text-3xl font-bold ">
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
                  to="/movies"
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

                <NavLink className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black">
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
                  type="text"
                  name="search"
                  className="w-full py-1.5 md:py-2 px-2 md:px-4 text-black bg-transparent border-2 border-primary outline-none"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex w-full flex-row items-center justify-center gap-8 *:font-semibold relative hidden">
          <div className="w-full">
            <input
              type="text"
              name="search"
              className="w-full py-2 lg:py-3 px-4 text-white bg-[#d12222] backdrop-blur-xl border-none outline-none"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex flex-row relative justify-end">
          {user ? (
            <div
              onClick={() => setShow(!show)}
              className="w-12 lg:w-14 h-12 lg:h-14 tooltip tooltip-left bg-white rounded-full z-10"
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
  );
};

export default Navbar;
