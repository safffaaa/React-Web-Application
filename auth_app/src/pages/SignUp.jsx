import React, { useState } from "react";
import { Register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {

    const [username,setUsername] = useState('') 
    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('') 
    const [passwordtwo,setPasswordtwo] = useState('') 

    const nav = useNavigate()

   
    async function handleSubmit(e){
        e.preventDefault() 
       try {
        if(password === passwordtwo){
            const formData = {
                username,
                email,
                password
            }
            const res = await Register(formData)
            console.log(res);
            nav('/login')
            
        }
       } catch (error) {
        console.error(error);
       }
    }


  return (
    <div className="bg-red-100 h-screen flex items-center justify-center">
      <div className="w-1/3 bg-white rounded shadow p-10">
        <h1 className="font-bold text-center text-3xl">SignUp</h1>
        <hr className="m-5" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label>Username</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="border rounded shadow-sm w-full"/>
          </div>
          <div className="flex flex-col mb-3">
            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="border rounded shadow-sm w-full"/>
          </div>
          <div className="flex flex-col mb-3">
            <label>Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" className="border rounded shadow-sm w-full"/>
          </div>
          <div className="flex flex-col mb-3">
            <label>Confirm Password</label>
            <input value={passwordtwo} onChange={(e)=>setPasswordtwo(e.target.value)} type="text" className="border rounded shadow-sm w-full"/>
          </div>
          <div className="flex flex-col mt-5">
            <input type="submit" className="bg-blue-500 rounded py-3 text-white font-bold hover:bg-blue-700 cursor-pointer" value={"Sign Up"} />
          </div>
        </form>
        <p className="text-sm">already have an account<Link className="ml-2 text-blue-700" to={'/login'}>Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
