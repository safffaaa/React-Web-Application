import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../App/authSlice";

function Home() {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-600">Hello!</h1>
      <div className="mt-5">
        {isLogged ? (
         <>
          <button onClick={() =>dispatch(logout()) } className="bg-red-500 rounded m-2 py-2 px-5 text-white">
            Logout
          </button>
          <Link
              to={"/profile"}
              className="bg-red-500 rounded m-2 py-2 px-5 text-white"
            >
              Profile
            </Link>
         </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="bg-red-500 rounded m-2 py-2 px-5 text-white"
            >
              Login
            </Link>
            <Link
              to={"/signUp"}
              className="bg-red-500 rounded m-2 py-2 px-5 text-white"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
