import { useLoaderData } from "react-router-dom";

const ViewDetails = () => {
  const data = useLoaderData();

  const { poster, summary, rating, title, genre, releaseYear, duration } = data;
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-4 ">
        <div className="md:col-span-2 aspect-square p-6">
          <img
            className="w-full h-full object-cover bg-center"
            src={poster}
            alt=""
          />
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default ViewDetails;
