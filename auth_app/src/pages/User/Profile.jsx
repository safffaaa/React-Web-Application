import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProfile } from "../../utils/api";

function Profile() {

  const {token} = useSelector(state => state.auth) 
  const [user,setUser] = useState({})

  const profileData = async () =>{
    try {
      const res = await fetchProfile(token)
      console.log(res);
      setUser(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    profileData()
  },[])


  return (
    <div className="h-screen bg-red-100 py-10 flex flex-col items-center">
      <p className="text-2xl font-bold mb-6">Profile Page</p>
      <div className="rounded-lg border w-full max-w-md bg-white shadow-lg p-6 flex flex-col items-center">
        <img
          src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPaDzL_zO6Q6M-lgKkZFrctUvwgkNZwGu83-Oik0P09Th1PGj41jHfa4o6Vm09mfPIXs&usqp=CAU "}
          alt=""
          className="rounded-full"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="text-center mb-6">
          <p className="text-lg font-medium">{user.username}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <div className="w-full flex justify-between">
          <Link to={`/Edit/${user._id}`} className="bg-red-500 hover:bg-red-700  px-4 py-2 rounded-md shadow font-semibold text-white">
            Edit profile
          </Link>
          <Link to={'/changePass'} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md shadow font-semibold text-white">
            Change password
          </Link>
        </div>
      
      </div>
    </div>
  );
}

export default Profile;
