import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";

const Favorite = () => {
  const { favorite } = useContext(ProviderContext);
  console.log(favorite);

  return (
    <div className="mt-16">
      <section className="w-11/12 mx-auto flex flex-col gap-6 md:gap-10 py-6 md:py-10 lg:py-12">
        <div className="flex justify-center flex-col items-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2">
            MY FAVORITE MOVIES
          </h3>
          <div className="border-b-2 border-primary w-10"></div>
        </div>
        {favorite.map((m) => (
          <div
            key={m._id}
            className="flex flex-row justify-between shadow-lg p-4 md:p-6"
          >
            <div className="flex flex-row gap-4 md:gap-6">
              <img
                className="w-28 md:w-32 h-36 md:h-40 object-cover bg-center bg-no-repeat"
                src={m.poster}
                alt=""
              />
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-2 md:my-3">
                  {m.title}
                </h3>
                <p className="text-gray-500">
                  {m.genre.map((g, i) => (
                    <span key={i}>{g}, </span>
                  ))}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Favorite;
