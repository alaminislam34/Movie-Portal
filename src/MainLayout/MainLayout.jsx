import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PageLoader from "../Components/PageLoader";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { FiTriangle } from "react-icons/fi";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [up, setUp] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setUp(true);
      } else {
        setUp(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div>
          <Navbar />
          <section className="max-w-[1380px] mx-auto overflow-hidden min-h-[80vh]">
            <Outlet />
          </section>
          <Footer />
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed duration-1000 z-30 cursor-pointer ${
              up ? "bottom-10 md:bottom-16" : "-bottom-96"
            } md:right-10 right-5 bg-primary flex justify-center items-center p-2 md:p-4 text-xl md:text-2xl rounded-full text-white`}
          >
            <FiTriangle />
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayout;
