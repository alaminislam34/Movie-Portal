import React from "react";
import { RiMovie2Fill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="">
      <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-start gap-4 lg:gap-6 w-11/12 mx-auto py-12">
        <div className="md:col-span-2 lg:col-span-5 justify-center items-center flex mb-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold flex flex-row items-center">
            <RiMovie2Fill className="text-primary mr-2" />
            Movie<span className="text-primary">Nest</span>
          </h2>
        </div>
        <div className="flex flex-col gap-1 justify-start">
          <h6 className="footer-title">Services</h6>
          <p className="text-sm link-hover inline cursor-pointer">Branding</p>
          <p className="text-sm link-hover inline cursor-pointer">Design</p>
          <p className="text-sm link-hover inline cursor-pointer">Marketing</p>
          <p className="text-sm link-hover inline cursor-pointer">
            Advertisement
          </p>
        </div>
        <div className="flex flex-col gap-1 justify-start">
          <h6 className="footer-title">Company</h6>
          <p className="text-sm link-hover inline cursor-pointer">About us</p>
          <p className="text-sm link-hover inline cursor-pointer">Contact</p>
          <p className="text-sm link-hover inline cursor-pointer">Jobs</p>
          <p className="text-sm link-hover inline cursor-pointer">Press kit</p>
        </div>
        <div className="flex flex-col gap-1 justify-start">
          <h6 className="footer-title">Legal</h6>
          <p className="text-sm link-hover inline cursor-pointer">
            Terms of use
          </p>
          <p className="text-sm link-hover inline cursor-pointer">
            Privacy policy
          </p>
          <p className="text-sm link-hover inline cursor-pointer">
            Cookie policy
          </p>
        </div>
        <form className="lg:col-span-2">
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="">
              <input
                type="text"
                placeholder="username@site.com"
                className=" py-2 px-3"
              />
              <button className="rounded-r-lg join-item py-2 px-3 bg-primary text-white hover:bg-black duration-700">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
