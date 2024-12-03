import React from "react";
import { RiMenu2Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const links = [
    <NavLink>Home</NavLink>,
    <NavLink>All Movies</NavLink>,
    <NavLink>Add Movie</NavLink>,
    <NavLink>My Favorites</NavLink>,
    <NavLink>Search</NavLink>,
  ];
  return (
    <div className="">
      <nav className="flex justify-between items-center w-11/12 mx-auto my-2">
        <div className="flex items-center gap-2">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button lg:hidden">
              <RiMenu2Line />
            </label>
          </div>
          <div className="drawer-content">
            <button className="static lg:hidden drawer-button"></button>
          </div>
          <h2>MovieNest</h2>
          <div className="drawer-side lg:hidden">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="p-4 flex flex-col gap-2 min-h-full w-1/2 bg-purple-500">
              {links}
            </div>
          </div>
        </div>
        <div className="lg:flex hidden flex-row items-center  gap-8">
          {links}
        </div>
        <div className="flex flex-row">
          <button onClick={() => navigate("/signin")}>Sign in</button>
          <button>Sign Up</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
