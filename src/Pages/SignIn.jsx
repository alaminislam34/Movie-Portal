import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import { ProviderContext } from "../Provider/AuthContext";
// import { ProviderContext } from "../Provider/AuthContext";

const SignIn = () => {
  const { user, setUser } = useContext(ProviderContext);
  console.log(user);
  const [error, setError] = useState();
  const [passError, setPassError] = useState(false);
  // const { number } = useContext(ProviderContext);
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
        .then((result) => {
          updateProfile(auth.currentUser, updateUser)
            .then(() => {})
            .catch((error) => {
              setError(error.message);
            });
          const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
          return () => unSubscribe();
          console.log(result.user);

          setUser(result.user);
        })
        .catch((error) => {
          setError(error.message);
        });
      const updateUser = { displayName: name, photoURL: photoUrl };

      fetch("https://movie-portal-server-site.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      setPassError(true);
    }
  };
  const signUpGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        {
          result.user && setUser(result.user);
        }
      })
      .catch((error) => {
        console.log(error.message);
        {
          error && setError(error);
        }
      });
  };
  return (
    <div className="flex justify-center items-center mt-12">
      <section>
        <form className="p-6 hidden flex-col justify-start bg-base-200 shadow-lg border border-black rounded-lg space-y-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
            Sign In
          </h2>
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
            <input
              required
              className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
              type="password"
              name="password"
              placeholder="Password"
            />
            <Link className="text-xs md:text-sm">Forget password</Link>
          </label>
          <button type="submit" className="btn">
            Login
          </button>
          <p>
            Don't have an account ? <Link>Sign Up</Link>
          </p>
        </form>
        <form
          onSubmit={handleSignUp}
          className="p-6 flex flex-col justify-start bg-base-200 shadow-lg border border-black rounded-lg space-y-1 lg:w-96"
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
            <input
              required
              className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
              type="password"
              name="password"
              placeholder="Password"
            />
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
          <br />
          <button type="submit" className="btn border py-2 border-black">
            Register
          </button>
          <button
            onClick={signUpGoogle}
            type="button"
            className="py-2 text-center flex flex-row justify-center items-center gap-2 border border-black hover:bg-gray-400 hover:border-transparent duration-500"
          >
            <FaGoogle /> Continue with google
          </button>
          <p>
            Already have an account ? <Link>Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
