import React, { useContext, useState } from "react";
import { RiMenu2Line, RiMovie2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";

const Navbar = () => {
  const { user, handleLogoutUser } = useContext(ProviderContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  console.log(user);
  const links = [
    <NavLink className="hover:scale-105 duration-500 hover:translate-x-5">
      Home
    </NavLink>,
    <NavLink className="hover:scale-105 duration-500 hover:translate-x-5">
      All Movies
    </NavLink>,
    <NavLink
      to="/addMovie"
      className="hover:scale-105 duration-500 hover:translate-x-5"
    >
      Add Movie
    </NavLink>,
    <NavLink className="hover:scale-105 duration-500 hover:translate-x-5">
      My Favorites
    </NavLink>,
    <NavLink
      to="/userProfile"
      className="hover:scale-105 duration-500 hover:translate-x-5"
    >
      Profile
    </NavLink>,
    <button
      onClick={handleLogoutUser}
      className="btn w-full hover:bg-primary bg-white hover:border hover:border-white duration-500 text-white"
    >
      log out
    </button>,
  ];
  return (
    <div className="bg-primary">
      <nav className="flex flex-1 justify-between items-center md:py-4 py-2 text-white max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-1 drawer-end z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button btn">
              <RiMenu2Line className="text-lg md:text-xl" />
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
            <div className="p-4 md:p-6 flex flex-col gap-2 min-h-full w-2/5 lg:w-1/3 bg-white/80 text-primary overflow-hidden">
              <h2 className="flex flex-row gap-1 items-center text-xl md:text-2xl lg:text-3xl font-bold ">
                <RiMovie2Fill /> MovieNest
              </h2>
              <ul
                className="*:text-lg md:text-xl lg:text-2xl flex flex-col gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 my-4 md:my-6 
              *:font-semibold *:text-black hover:*:text-primary"
              >
                {links}
              </ul>
              <div className="md:hidden">
                <input
                  type="text"
                  name="search"
                  className="w-full py-2 px-4 text-white bg-black/50 backdrop-blur-xl border-none outline-none"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex w-full flex-row items-center justify-center gap-8 *:font-semibold relative hidden">
          <div className="w-2/4">
            <input
              type="text"
              name="search"
              className="w-full py-4 px-4 text-white bg-black/50 backdrop-blur-xl border-none outline-none"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex flex-row relative">
          {user ? (
            <div
              onClick={() => setShow(!show)}
              className="w-12 h-12 tooltip tooltip-left bg-white rounded-full"
              data-tip={user ? user.email : ""}
            >
              <img
                src={user.photoURL}
                className="w-full h-full object-cover bg-center rounded-full border border-red-500 cursor-pointer"
              />
            </div>
          ) : (
            <button onClick={() => navigate("/signin")} className="btn w-full ">
              SignIn
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
