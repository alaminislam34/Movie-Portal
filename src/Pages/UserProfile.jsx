import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";

const UserProfile = () => {
  const { user, handleLogoutUser } = useContext(ProviderContext);
  return (
    <div className="flex justify-center items-center my-12">
      {user ? (
        <div className="p-4 md:p-6 border bg-primary flex flex-col justify-center items-center space-y-2 md:space-y-4 md:w-80 w-72">
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
          <p className="text-sm md:text-base lg:text-lg">Email: {user.email}</p>
          <button className="btn w-full hover:bg-primary bg-white hover:border hover:border-white duration-500">
            Update Profile
          </button>
          <button
            onClick={handleLogoutUser}
            className="btn w-full hover:bg-primary bg-white hover:border hover:border-white duration-500"
          >
            log out
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserProfile;
