import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleResetPass = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Send!",
          text: "Reset Email Send Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate("/userProfile");
      })
      .catch(() => {});
  };
  return (
    <div className="bg-backImg w-full h-[80vh] flex justify-center items-center object-cover">
      <div className="bg-black/50 w-full h-full flex justify-center items-center">
        <div className="flex justify-center w-11/12 md:w-4/6 lg:w-6/12 mx-auto items-center">
          <section className="w-full h-full py-12">
            <form
              onSubmit={handleResetPass}
              className="p-6 lg:p-10 flex flex-col gap-2 justify-start bg-white/10 backdrop-blur-xl text-white shadow-lg border border-black rounded-lg space-y-1 w-full h-full"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
                Reset Email Send
              </h2>
              <div>
                <label className="flex flex-col gap-2">
                  Your Email
                  <input
                    required
                    className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="btn border w-full py-2 duration-500 bg-primary hover:bg-[#d12222] text-white text-base md:text-lg"
                >
                  Send
                </button>
              </div>
              <p className="text-right">
                Don't have an account ?{" "}
                <Link to="/signUp" className="font-semibold">
                  Sign Up
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
