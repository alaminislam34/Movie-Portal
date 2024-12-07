import { Triangle } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
      <Triangle
        visible={true}
        height="100"
        width="100"
        color="#ff4444"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default PageLoader;
