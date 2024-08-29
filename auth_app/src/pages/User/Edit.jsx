import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../../utils/api"; // Assuming updateProfile is the API function for submitting changes
import { useNavigate } from "react-router-dom";

function Edit() {
  const { token } = useSelector((state) => state.auth);
  const nav = useNavigate()

  const [user, setUser] = useState({
    username: "",
    profilePic: null,
  });

  const profileFetch = async () => {
    try {
      const res = await fetchProfile(token);
      console.log(res);
      setUser({
        username: res.username,
        profilePic: res.profilePic,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    profileFetch();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      profilePic: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    if (user.profilePic) {
      formData.append("profilePic", user.profilePic);
    }

    try {
      await updateProfile(token, formData);
      nav('/profile')
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="bg-red-100 h-screen flex items-center justify-center">
      <div className="w-1/3 bg-white rounded shadow p-10">
        <h1 className="font-bold text-center text-3xl">Edit Profile</h1>
        <hr className="m-5" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="border rounded shadow-sm w-full"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label>Profile Picture</label>
            <input
              type="file"
              className="border rounded shadow-sm w-full"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col mt-5">
            <input
              type="submit"
              className="bg-red-500 rounded py-3 text-white font-bold hover:bg-red-700 cursor-pointer"
              value="Save Changes"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;