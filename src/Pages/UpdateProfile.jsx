import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        navigate("/userProfile");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-movie w-full h-[80vh] object-cover bg-center flex justify-center items-center">
      <div className="flex justify-center items-center w-full h-full bg-black/10 py-12">
        <form
          onSubmit={handleUpdateProfile}
          className="max-w-xs flex flex-col justify-center items-center gap-2 p-4 md:p-6 shadow-[_0px_4px_10px_rgba(0, 0, 0, 0.5)] bg-white/10 backdrop-blur-xl rounded-lg shadow-2xl space-y-3 md:space-y-4 my-3"
        >
          <h3 className="text-lg md:text-xl font-semibold text-center ">
            Update Your Profile
          </h3>
          <div>
            <input
              className="w-full h-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg border border-primary outline-darkPri"
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <input
              className="w-full h-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg border border-primary outline-darkPri"
              type="text"
              name="photoURL"
              placeholder="Your photoURL"
              required
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="btn h-full w-full bg-primary hover:bg-darkPri"
            >
              Update
            </button>
          </div>

          <div>
            <Link
              to="/userProfile"
              type="button"
              className="text-right py-1 px-2"
            >
              Profile
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
