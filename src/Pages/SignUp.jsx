import { Link, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useContext, useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import { ProviderContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const { setUser, error, setError } = useContext(ProviderContext);
  const [passError, setPassError] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoUrl = form.photo.value;
    const password = form.password.value;
    const user = { name, email, photoUrl };
    const valid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (valid.test(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          const updateUser = { displayName: name, photoURL: photoUrl };
          updateProfile(auth.currentUser, updateUser)
            .then((result) => {
              console.log(result);

              form.reset();
            })
            .catch((error) => {
              setError(error.message);
            });
        })
        .catch((error) => {
          setError(error.message);
        });

      fetch("https://movie-portal-server-site.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Account Register Successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
            navigate("/");
          }
        });
    } else {
      setPassError(true);
    }
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
        console.log(location);
      })
      .catch((error) => {
        {
          error && setError(error);
        }
      });
  };
  return (
    <div className="my-12 w-11/12 md:w-4/6 lg:w-6/12 mx-auto">
      <form
        onSubmit={handleSignUp}
        className="p-6 flex flex-col gap-2 justify-start bg-base-200 shadow-lg border border-black rounded-lg space-y-1 w-full"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
          Register
        </h2>
        {error ? <p className="text-red-500 text-center"> {error} </p> : ""}

        <label className="flex flex-col gap-2">
          Your Name
          <input
            required
            className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
            type="name"
            name="name"
            placeholder="Name"
          />
        </label>
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
              {show ? <FaEye className="" /> : <IoEyeOff className="" />}
            </button>
          </div>
          {passError ? (
            <small className="text-red-500">
              Password must be 1 upperCase 1 lowerCase & 6 character
            </small>
          ) : (
            ""
          )}
        </label>
        <label className="flex flex-col gap-2">
          Photo URL
          <input
            required
            className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
            type="text"
            name="photo"
            placeholder="photo url"
          />
        </label>

        <div className="flex flex-col gap-2 pt-6">
          <button
            type="submit"
            className="btn border py-2 duration-500 bg-primary hover:bg-[#d12222] text-white text-base md:text-lg"
          >
            Register
          </button>
          <button
            onClick={signUpGoogle}
            type="button"
            className="py-2 text-center rounded-lg flex flex-row justify-center items-center gap-2 bg-gray-400 hover:border-transparent duration-500"
          >
            <FaGoogle /> Continue with google
          </button>
        </div>
        <p className="text-right">
          Already have an account ?{" "}
          <Link to="/signin" className="font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
