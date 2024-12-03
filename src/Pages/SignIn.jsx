import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProviderContext } from "../Provider/AuthContext";

const SignIn = () => {
  const { number } = useContext(ProviderContext);
  return (
    <div className="flex justify-center items-center mt-12">
      <section>
        <form className="p-6 flex flex-col justify-start bg-base-200 shadow-lg border border-black rounded-lg space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
            Sign In
          </h2>
          <label className="flex flex-col gap-2">
            Your Email
            <input
              className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>
          <label className="flex flex-col gap-2">
            Your Password
            <input
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
        <form className="p-6 flex flex-col justify-start bg-base-200 shadow-lg border border-black rounded-lg space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">
            Register
          </h2>
          <label className="flex flex-col gap-2">
            Your Name
            <input
              className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
              type="name"
              name="name"
              placeholder="Name"
            />
          </label>
          <label className="flex flex-col gap-2">
            Your Email
            <input
              className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>
          <label className="flex flex-col gap-2">
            Your Password
            <input
              className="py-1 pr-2 border-b focus:border-b-2 bg-transparent focus:outline-none border-b-black "
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>
          <button type="submit" className="btn">
            Register
          </button>
          <button onClick={signInGoogle} type="button" className="btn">
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
