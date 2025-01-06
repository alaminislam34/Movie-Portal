import { useContext } from "react";
import {
  FaApple,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";

const Footer = () => {
  const { setLoading } = useContext(ProviderContext);
  const handleLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1500);
  };

  return (
    <div className="bg-base-300 text-base-content pt-10">
      <div className="max-w-[1380px] mx-auto">
        <div className="md:col-span-2  lg:col-span-5 justify-center items-center flex mb-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold flex flex-row items-center ">
            <RiMovie2Fill className="text-primary mr-2" />
            Movie<span className="text-primary">Nest</span>
          </h2>
        </div>
        <footer className="grid grid-cols-2 lg:grid-cols-4 gap-4  py-6 px-4 md:p-8 lg:p-10">
          <div>
            <h4 className="text-base md:text-lg lg:text-xl mb-2">Links</h4>
            <div className="border-b-2 border-primary my-2 w-16 mb-4"></div>
            <ol className="grid grid-flow-row gap-2 justify-start hover:*:text-primary *:cursor-pointer *:text-xs md:*:text-sm list-disc list-inside ">
              <li>
                <NavLink to="/" onClick={() => handleLoading("/")}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allMovies"
                  onClick={() => handleLoading("/allMovies")}
                >
                  All Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addMovie"
                  onClick={() => handleLoading("/addMovie")}
                >
                  Add Movie
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trendingMovies"
                  onClick={() => handleLoading("/trendingMovies")}
                >
                  Trending Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorite"
                  onClick={() => handleLoading("/favorite")}
                >
                  My Favorites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/userProfile"
                  onClick={() => handleLoading("/userProfile")}
                >
                  Profile
                </NavLink>
              </li>
            </ol>
          </div>
          <div>
            <h4 className="text-base md:text-lg lg:text-xl mb-2">
              Movies by presenter
            </h4>
            <div className="border-b-2 border-primary my-2 w-16 mb-4"></div>
            <ol className="grid grid-flow-row gap-2 justify-start hover:*:text-primary *:cursor-pointer *:text-sm list-disc list-inside ">
              <li>
                <a>Action Movies</a>
              </li>
              <li>
                <a>Drama Movies</a>
              </li>
              <li>
                <a>Adventure Movies</a>
              </li>
              <li>
                <a>Comedy Movies</a>
              </li>
              <li>
                <a>Horror Movies</a>
              </li>
              <li>
                <a>Thriller Movies</a>
              </li>
            </ol>
          </div>
          <div className="w-full col-span-2">
            <h4 className="text-base md:text-lg lg:text-xl mb-2">
              App Available On
            </h4>
            <div className="border-b-2 border-primary my-2 w-16 mb-4"></div>
            <div>
              <p className="text-s">Download App and Get Free Movie Ticket !</p>
              {/* apple */}
              <div className="flex md:flex-row flex-col gap-4 my-2">
                <div className="flex flex-col md:flex-row gap-2 justify-start w-44 md:w-56 lg:w-60 cursor-pointer">
                  <div className=" border border-primary shadow-2xl flex flex-row gap-2 items-center justify-center py-2 rounded-lg w-full">
                    <div>
                      <FaApple className="text-3xl md:text-4xl lg:text-5xl" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs md:text-sm lg:text-bas">
                        Download on the{" "}
                      </p>
                      <p className="text-base md:text-lg lg:text-xl">
                        App Store
                      </p>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="flex flex-col md:flex-row gap-2 justify-start w-44 md:w-56 lg:w-60 cursor-pointer">
                  <div className=" border border-primary shadow-2xl flex flex-row gap-2 items-center justify-center py-2 rounded-lg w-full">
                    <div>
                      <IoLogoGooglePlaystore className="text-3xl md:text-4xl lg:text-5xl" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs md:text-sm lg:text-bas">
                        Download on the{" "}
                      </p>
                      <p className="text-base md:text-lg lg:text-xl">
                        App Store
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="w-full py-6 md:py-8 bg-black flex text-white flex-col md:flex-row gap-4 justify-between items-center">
          <p className=" px-4 text-xs md:text-sm text-center">
            Copyright 2022-23 <span className="text-primary">MovieNest</span> .
            All rights reserved - Design by{" "}
            <span className="text-primary">Webstrot</span>
          </p>
          <ul className=" flex flex-row gap-2 md:*:w-10 *:w-8 md:*:h-10 *:h-8 *:flex *:justify-center text-primary hover:*: hover:*:bg-primary *:text-lg md:*:text-xl *:rounded-lg *:bg-primary/10 *:duration-700 *:cursor-pointer px-4 *:items-center hover:*:text-white">
            <li>
              <a>
                <FaFacebook />
              </a>
            </li>
            <li>
              <a>
                <FaTwitter />
              </a>
            </li>
            <li>
              <a>
                <FaInstagram />
              </a>
            </li>
            <li>
              <a>
                <FaGoogle />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
