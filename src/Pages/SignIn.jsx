import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../Firebase/firebase.config";
import { useContext, useState } from "react";
import { ProviderContext } from "../Provider/AuthContext";
import { IoEyeOff } from "react-icons/io5";
import PageLoader from "../Components/PageLoader";

const SignIn = () => {
  const { setUser, setError, error, loading, setLoading } =
    useContext(ProviderContext);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(loading);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        Swal.fire({
          title: "Success!",
          text: "Account Register Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const signUpGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        {
          result.user && setUser(result.user);
        }
        Swal.fire({
          title: "Success!",
          text: "Account Register Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        {
          error && setError(error);
        }
      });
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="bg-backImg w-full h-full object-cover bg-center">
          <div className="bg-black/30 w-full h-full">
            <div className="flex justify-center items-center py-12">
              <section className="w-11/12 md:w-4/6 lg:w-6/12 mx-auto py-12">
                <form
                  onSubmit={handleSignIn}
                  className="p-6 flex flex-col gap-2 justify-start bg-transparent backdrop-blur-xl text-white shadow-lg border border-black rounded-lg space-y-1 w-full"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
                    Sign In
                  </h2>
                  {error && (
                    <small className="text-center text-red-500 my-2">
                      {error}
                    </small>
                  )}
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
                  <div>
                    <label className="flex flex-col gap-2">
                      Your Password
                      <div className="relative">
                        <input
                          required
                          className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black w-full"
                          type={show ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4"
                        >
                          {show ? (
                            <FaEye className="" />
                          ) : (
                            <IoEyeOff className="" />
                          )}
                        </button>
                      </div>
                      <Link
                        to="/resetPass"
                        className="text-xs md:text-sm underline"
                      >
                        Forget password
                      </Link>
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="btn border w-full py-2 duration-500 bg-primary hover:bg-[#d12222] text-white text-base md:text-lg"
                    >
                      Login
                    </button>
                    <button
                      onClick={signUpGoogle}
                      type="button"
                      className="w-full py-2 text-center rounded-lg flex flex-row justify-center items-center gap-2 bg-gray-400 hover:border-transparent duration-500"
                    >
                      <FaGoogle /> Continue with google
                    </button>
                  </div>
                  <p className="text-right ">
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
      )}
    </>
  );
};

export default SignIn;
