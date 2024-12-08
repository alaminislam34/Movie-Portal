import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PageLoader from "../Components/PageLoader";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
    }, 1500);
    return () => clearInterval(timer);
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
        </div>
      )}
    </>
  );
};

export default MainLayout;
