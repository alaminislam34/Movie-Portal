import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import PageLoader from "../Components/PageLoader";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, handleLogoutUser, loading } = useContext(ProviderContext);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <section className="bg-movie object-cover bg-center h-[90vh] w-full">
          <div className="flex justify-center items-center py-12">
            {user ? (
              <div className="p-4 md:p-6 shadow-xl rounded-xl bg-transparent/20 backdrop-blur-md flex flex-col justify-center items-center space-y-2 md:space-y-4 md:w-80 w-72 text-white">
                <div className="w-28 md:w-36 h-28 md:h-36 rounded-full overflow-hidden">
                  {user.photoURL && (
                    <img
                      className="w-full h-full object-cover bg-center"
                      src={user.photoURL}
                      alt=""
                    />
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-semibold">
                  Name: {user.displayName}
                </h2>
                <p className="text-xs md:text-sm lg:text-base">
                  Email: {user.email}
                </p>
                <button
                  onClick={() => navigate("/updateProfile")}
                  className="py-2 rounded-lg w-full hover:bg-primary bg-transparent text-white border duration-1000"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleLogoutUser}
                  className="py-2 rounded-lg w-full hover:bg-primary bg-transparent text-white border duration-1000"
                >
                  log out
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default UserProfile;
