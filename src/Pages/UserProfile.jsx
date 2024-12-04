import { useContext } from "react";
import { ProviderContext } from "../Provider/AuthContext";

const UserProfile = () => {
  const { user } = useContext(ProviderContext);
  return (
    <div>
      <div>
        <img src="" alt="" />
        <h2>name</h2>
        <p>email</p>
        <button>Update Profile</button>
        <button>log out</button>
      </div>
    </div>
  );
};

export default UserProfile;
