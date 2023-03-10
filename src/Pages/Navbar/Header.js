import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  DocumentTextIcon,
  Square3Stack3DIcon,
  ClipboardDocumentCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { myContext } from "../../Context/AuthProvider";
import "./header.css";

const Header = () => {
  const [theme, setTheme] = useState("Light");
  const toggleTheme = () => {
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [openNav, setOpenNav] = useState(false);
  const { user, logOut } = useContext(myContext);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handelLogOut = () => {
    logOut()
      .then((result) => {})
      .catch((error) => console.error(error));
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10 border-0 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/"
          className="flex items-center hover:text-lg duration-300 transform bg-slate-600 text-white px-3 rounded-md py-2 font-bold hover:bg-white   hover:text-slate-600"
        >
          <CheckBadgeIcon className="w-5 h-6 mr-1"></CheckBadgeIcon> Add Task
        </Link>
      </Typography>

      <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to="/mytask"
            className="flex items-center hover:text-lg duration-300 transform bg-slate-600 text-white px-3 rounded-md py-2 font-bold hover:bg-white   hover:text-slate-600"
          >
            <DocumentTextIcon className="w-5 h-6 mr-1"></DocumentTextIcon> My
            Task
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to="/completedtask"
            className="flex items-center hover:text-lg duration-300 transform bg-slate-600 text-white px-3 rounded-md py-2 font-bold hover:bg-white   hover:text-slate-600"
          >
            <ClipboardDocumentCheckIcon className="w-5 h-6 mr-1"></ClipboardDocumentCheckIcon>{" "}
            Completed Tasks
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to="/blog"
            className="flex items-center hover:text-lg duration-300 transform bg-slate-600 text-white px-3 rounded-md py-2 font-bold hover:bg-white   hover:text-slate-600"
          >
            <Square3Stack3DIcon className="w-5 h-6 mr-1"></Square3Stack3DIcon>{" "}
            Blogs
          </Link>
        </Typography>
      </>
    </ul>
  );

  return (
    <Navbar className="mx-auto  py-2 px-4 lg:px-8 lg:py-4 bg-white bg-opacity-40 border-0 place-content-end ">
      {/* sticky top-0 z-50  */}
      <div className="container mx-auto flex items-center justify-between gap-20  text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <Link to="/">
            <img src="" alt="" />
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex gap-6">
          <div className="hidden md:block">
            {user?.photoURL ? (
              <img
                className=" rounded-full"
                style={{ height: "50px" }}
                src={user?.photoURL}
                alt={user?.displayName}
                title={user?.displayName}
              />
            ) : (
              <FaUser
                className="mt-2 w-10 h-8"
                title={user?.displayName}
              ></FaUser>
            )}
          </div>
          <div className="mt-1">
            {user?.uid ? (
              <button
                onClick={handelLogOut}
                type="button"
                className=" hidden md:block text-white font-bold  bg-teal-600 rounded-lg text-base px-8 py-2 text-center mr-2 mb-2 hover:bg-transparent hover:border-2 hover:border-white duration-200 transform"
              >
                Log Out
              </button>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  className=" hidden md:block text-red-500 font-bold  bg-white  rounded-lg text-base px-8 py-2 text-center mr-2 mb-2"
                >
                  Log In
                </button>
              </Link>
            )}
          </div>
          <button
            className={`font-bolder  hidden md:block rounded-full  p-2 font-bold ${
              theme == "Light" ? "bg-white text-black" : "bg-black text-white "
            } `}
            onClick={toggleTheme}
          >
            {theme}
          </button>
        </div>
        <IconButton
          variant="text"
          className=" h-6 w-6 mb-1 -mt-5 text-inherit hover:bg-white focus:bg-transparent active:bg-transparent  text-black lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
};

export default Header;
