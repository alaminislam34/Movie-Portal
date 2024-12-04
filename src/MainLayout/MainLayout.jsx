import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto overflow-hidden min-h-[80vh]">
        <Outlet />
      </section>
    </div>
  );
};

export default MainLayout;
