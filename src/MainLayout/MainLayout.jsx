import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Pages/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <section className="max-w-[1380px] mx-auto overflow-hidden min-h-[80vh]">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default MainLayout;
