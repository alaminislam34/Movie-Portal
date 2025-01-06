import { useContext, useEffect, useState } from "react";
import { RiMenu2Line, RiMovie2Fill } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  const { user, handleLogoutUser, setLoading, id, theme, setTheme } =
    useContext(ProviderContext);
  const [show, setShow] = useState(false);
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sticky = () => {
      if (window.scrollY >= 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", sticky);
    return () => window.removeEventListener("scroll", sticky);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  // set page title
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "MovieNest";
        break;
      case "/signin":
        document.title = "MovieNest || Login";
        break;
      case "/signUp":
        document.title = "MovieNest || Sign Up";
        break;
      case "/allMovies":
        document.title = "All Movies";
        break;
      case "/addMovie":
        document.title = "Add Movie";
        break;
      case "/favorite":
        document.title = "Favorite Movies";
        break;
      case `/viewDetails/${id}`:
        document.title = "Movie Details";
        break;
      case `/updateMovie/${id}`:
        document.title = "Favorite Movies";
        break;
      case `/resetPass`:
        document.title = "Password Reset";
        break;
      case `/trendingMovies`:
        document.title = "Trending Movies";
        break;
    }
  }, [location.pathname, id]);

  const handleLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1500);
  };

  return (
    <div
      className={`h-16 md:h-[70px] lg:h-[75px] ${
        sticky ? "sticky top-0 left-0 w-full z-50 bg-primary text-white" : ""
      } `}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className={`h-full py-3 `}>
        <nav className="flex flex-row justify-between items-center max-w-7xl mx-auto px-2">
          <div className="flex items-center sm:gap-1 drawer-end z-10 ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content lg:hidden">
              <label
                htmlFor="my-drawer"
                className="drawer-button cursor-pointer bg-[#d12222] duration-700 sm:py-1 sm:px-2 md:py-2 flex justify-center items-center md:px-4 rounded-md"
              >
                <RiMenu2Line className="text-xl md:text-xl lg:text-2xl" />
              </label>
            </div>
            <div className="drawer-content">
              <button className="static drawer-button"></button>
            </div>
            <h2
              onClick={() => handleLoading("/")}
              className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-1 cursor-pointer"
            >
              <RiMovie2Fill className="text-3xl md:text-4xl lg:text-5xl" />{" "}
              <span>MovieNest</span>
            </h2>
            <div className="drawer-side z-40">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="p-4 md:p-6 flex flex-col min-h-full translate-x-6 hover:text-primary md:w-1/3 bg-white/80 text-primary overflow-hidden">
                <h2
                  onClick={() => handleLoading("/")}
                  className="flex flex-row gap-1 items-center text-xl md:text-2xl lg:text-3xl font-bold"
                >
                  <RiMovie2Fill /> MovieNest
                </h2>
                <ul
                  className="*:text-base *:md:text-lg flex flex-col gap-2 md:gap-3 lg:gap-4 p-4 md:p-6 my-4 md:my-6 
              *:font-semibold *:py-2"
                >
                  <NavLink
                    onClick={() => handleLoading("/")}
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={() => handleLoading("/allMovies")}
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    All Movies
                  </NavLink>

                  <NavLink
                    onClick={() => handleLoading("/addMovie")}
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Add Movie
                  </NavLink>

                  <NavLink
                    onClick={() => handleLoading("/trendingMovies")}
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Trending Movies
                  </NavLink>

                  <NavLink
                    onClick={() => handleLoading("/favorite")}
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    My Favorites
                  </NavLink>

                  <NavLink
                    onClick={() => handleLoading("/userProfile")}
                    className="hover:scale-110 duration-500 hover:translate-x-6 hover:text-primary text-black"
                  >
                    Profile
                  </NavLink>
                </ul>
                <button
                  onClick={handleLogoutUser}
                  className="w-full hover:bg-transparent border border-primary duration-1000 hover:text-primary bg-primary py-1.5 md:py-2 mb-2"
                >
                  log out
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <ul className="flex flex-row gap-6">
              <NavLink onClick={() => handleLoading("/")} className="">
                Home
              </NavLink>
              <NavLink onClick={() => handleLoading("/allMovies")} className="">
                All Movies
              </NavLink>

              <NavLink
                onClick={() => handleLoading("/addMovie")}
                className={`${user ? "block" : "hidden"}`}
              >
                Add Movie
              </NavLink>

              <NavLink
                onClick={() => handleLoading("/trendingMovies")}
                className=""
              >
                Trending Movies
              </NavLink>

              <NavLink
                onClick={() => handleLoading("/favorite")}
                className={`${user ? "block" : "hidden"}`}
              >
                My Favorites
              </NavLink>

              <NavLink
                onClick={() => handleLoading("/userProfile")}
                className={`${user ? "block" : "hidden"}`}
              >
                Profile
              </NavLink>
            </ul>
          </div>
          <div className="flex flex-row items-center gap-2 relative justify-end">
            {user ? (
              <div
                onClick={() => setShow(!show)}
                className="w-10 md:w-12 h-10 md:h-12 tooltip tooltip-left bg-white rounded-full z-[10]"
                data-tip={user ? user.email : ""}
              >
                <img
                  src={user.photoURL}
                  className="w-full h-full object-cover bg-center rounded-full border border-red-500 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <button
                onClick={() => handleLoading("/signin")}
                className="py-1.5 md:py-2 px-2 md:px-4 bg-[#d12222] rounded-md text-sm md:text-base"
              >
                SignIn
              </button>
            )}
            <div className="flex justify-center items-center ">
              {theme === "light" && (
                <button
                  className="text-xl p-2 md:p-3"
                  onClick={() => setTheme("dark")}
                >
                  <MdLightMode />
                </button>
              )}
              {theme === "dark" && (
                <button
                  className="text-xl p-2 md:p-3"
                  onClick={() => setTheme("light")}
                >
                  <MdOutlineDarkMode />
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
