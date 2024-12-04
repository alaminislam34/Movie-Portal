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
import Movies from "./Pages/Movies";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Banner />,
          },
        ],
      },
      {
        path: "/movies",
        element: <Movies />,
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
        path: "/userProfile",
        element: (
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
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
