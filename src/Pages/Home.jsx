import { Outlet } from "react-router-dom";
import Banner from "../Components/Banner";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-6 mt-8">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">
          COMING SOON
        </h2>
        <h1 className="border-b-4 border-primary w-20 my-4"></h1>
      </div>
      <Banner />
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
