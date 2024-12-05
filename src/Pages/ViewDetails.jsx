import { useLoaderData } from "react-router-dom";

const ViewDetails = () => {
  const data = useLoaderData();

  const { poster, summary, rating, title, genre, releaseYear, duration } = data;
  return (
    <div>
      <section>
        <img src={poster} alt="" />
      </section>
    </div>
  );
};

export default ViewDetails;
