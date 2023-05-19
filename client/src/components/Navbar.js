import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();
  const [navColor, setNavColor] = useState(false)

  window.addEventListener("scroll",()=>{
    window.scrollY>=40?setNavColor(true):setNavColor(false)
  })

  return (
    <nav className={`px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 duration-300 ${navColor?"bg-slate-800":""}`}>
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center ">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-700">
            CloudBook
          </span>
        </div>
        {!localStorage.getItem("token") ? (
          // <div className="flex  md:order-2 space-x-4">
          //   <button
          //     type="button"
          //     onClick={() => {
          //       navigate("/login");
          //     }}
          //     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          //   >
          //     Login
          //   </button>
          //   <button
          //     type="button"
          //     onClick={() => {
          //       navigate("/signup");
          //     }}
          //     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          //   >
          //     Signup
          //   </button>
          // </div>
          ""
        ) : (
          <div className="flex  md:order-2 space-x-4">
            <button
              type="button"
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "You will have to login again once logged out",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    swal("Logged Out ", {
                      icon: "success",
                    });
                  }
                });
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
