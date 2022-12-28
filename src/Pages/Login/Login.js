import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import login1 from "../../img/3.png";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { myContext } from "../../Context/AuthProvider";

import Bounce from 'react-reveal/Bounce';

const Login = () => {
  const [error, setError] = useState("");
  const { logIn, googleSignIn, githubSignIn, user , loading } = useContext(myContext);
  



  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate = useNavigate();


 


  const handelSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
      
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
 

  const handelGoogleSignIn = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handelGithubSignIn = () => {
    githubSignIn(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div className="flex justify-center mt-32 h-[100vh]">
        
<div role="status">
    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

    </div>
  }

  return (
    <div className=" h-[100vh] ">

    <div className="md:w-[50rem] mx-auto">
      <div className="mx-12 my-5 bg-white bg-opacity-30 rounded-lg    border ">
      <h1 className="text-white text-center text-3xl font-bold underline mt-2">Login</h1>
        <Bounce top>

        <div className="block p-8 md:p-20 ">
          <form onSubmit={handelSubmit}>
            <div className="form-group mb-6">
              <label
                for="exampleInputEmail1"
                className="form-label inline-block mb-2 font-bold text-white"
              >
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-black
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mb-6">
              <label
                for="exampleInputPassword1"
                className="form-label inline-block mb-2 font-bold text-white"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-black
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <h1 className="font-bold text-xs mb-10 text-white">
              New in this page?{" "}
              <Link className="text-black" to="/signup">
                Create an account
              </Link>
            </h1>
            <h1 className="my-2 text-red-600 font-bold">{error}</h1>
            <button
              type="submit"
              className="w-full tracking-wider px-8 py-2.5 text-sm text-teal-400  duration-300 transform border border-teal-500 hover:text-white rounded-md lg:w-auto hover:bg-teal-500 focus:outline-none focus:bg-teal-500 hover:px-14"
            >
              Log in
            </button>
          </form>
          <div className="grid grid-cols-3">
            <div className="mt-2">
              <hr />
              <hr />
            </div>
            <div className="text-center">Or</div>
            <div className="mt-2">
              <hr />
              <hr />
            </div>
          </div>
          <div></div>
          <div
            onClick={handelGoogleSignIn}
            className="flex gap-2  border  rounded-xl"
          >
            <button className="flex font-bold mt-2  py-2 ">
              {" "}
              <FaGoogle className="w-10 h-8 mx-5  text-center"></FaGoogle>{" "}
              <h1 className="mt-1"> Sign in with Google </h1>
            </button>
          </div>
          <br />

          <div
            onClick={handelGithubSignIn}
            className="flex gap-2 border rounded-xl "
          >
            <button className="flex font-bold mt-2 py-2  ">
              {" "}
              <FaGithub className="w-10 h-8 mx-5"></FaGithub>{" "}
              <h1 className="mt-1"> Sign in with Github</h1>
            </button>
          </div>
        </div>
        </Bounce>
     
      </div>
    </div>
    </div>
  );
};

export default Login;
