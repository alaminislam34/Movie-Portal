import invalidPage from "../assets/404 Page/404page.jpg";
const InvalidPage = () => {
  return (
    <div className="w-full h-[80vh] p-6 md:p-12 flex justify-center items-center">
      <img
        className="w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 mx-auto"
        src={invalidPage}
        alt=""
      />
    </div>
  );
};

export default InvalidPage;
