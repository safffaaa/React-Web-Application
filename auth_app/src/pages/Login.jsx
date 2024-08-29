import React, { useState } from "react";
import { loginApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../App/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

 
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = {
        username,
        password,
      };
      const res = await loginApi(formData);
      console.log(res);
      dispatch(login(res.data))
      const role = res.data.role
      if( role === "user"){
        nav('/')
      }else{
        nav('/admin')
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="bg-red-100 h-screen flex items-center justify-center">
      <div className="w-1/3 bg-white rounded shadow p-10">
        <h1 className="font-bold text-center text-3xl">Login</h1>
        <hr className="m-5" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded shadow-sm w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded shadow-sm w-full"
            />
          </div>
          <div className="flex flex-col mt-5">
            <input
              type="submit"
              className="bg-blue-500 rounded py-3 text-white font-bold hover:bg-blue-700 cursor-pointer"
              value={"Login"}
            />
          </div>
        </form>
        <p className="text-sm">create new account<Link className="ml-2 text-blue-700" to={'/signUp'}>SignUp</Link></p>
      </div>
    </div>
  );
}

export default Login;
