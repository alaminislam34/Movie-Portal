import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Banner from "./Components/Banner";
import SignIn from "./Pages/SignIn";
import MainLayout from "./MainLayout/MainLayout";
import AuthContext from "./Provider/AuthContext";
import AddMovie from "./Pages/AddMovie";
import UserProfile from "./Pages/UserProfile";
import PrivateRoutes from "./routes/PrivateRoutes";
import SignUp from "./Pages/SignUp";
import ViewDetails from "./Pages/ViewDetails";
import AllMovies from "./Pages/AllMovies";
import Favorite from "./Pages/Favorite";
import MovieUpdate from "./Pages/MovieUpdate";
import InvalidPage from "./Pages/InvalidPage";
import TrendingMovies from "./Pages/TrendingMovies";
import ResetPassword from "./Pages/ResetPassword";
import UpdateProfile from "./Pages/UpdateProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch("https://movie-portal-server-site.vercel.app/movies"),
      },
      {
        path: "/allMovies",
        element: <AllMovies />,
        loader: () =>
          fetch("https://movie-portal-server-site.vercel.app/movies"),
      },
      {
        path: "/addMovie",
        element: (
          <PrivateRoutes>
            <AddMovie />
          </PrivateRoutes>
        ),
      },
      {
        path: "/trendingMovies",
        element: <TrendingMovies />,
      },
      {
        path: "/updateMovie/:id",
        element: (
          <PrivateRoutes>
            <MovieUpdate />
          </PrivateRoutes>
        ),
      },
      {
        path: "/favorite",
        element: (
          <PrivateRoutes>
            <Favorite />
          </PrivateRoutes>
        ),
        loader: () =>
          fetch("https://movie-portal-server-site.vercel.app/favorites"),
      },
      {
        path: "/userProfile",
        element: (
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoutes>
            <UpdateProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/resetPass",
        element: <ResetPassword />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/viewDetails/:id",
        element: (
          <PrivateRoutes>
            <ViewDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://movie-portal-server-site.vercel.app/movies/${params.id}`
          ),
      },
      {
        path: "/*",
        element: <InvalidPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
);
