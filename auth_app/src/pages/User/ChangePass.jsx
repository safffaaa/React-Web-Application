import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../../utils/api";

function ChangePass() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { token } = useSelector((state) => state.auth);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        Old_Password: oldPass,
        New_Password: newPass,
      };
      await ChangePassword(token, formData);
      nav("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-100 h-screen flex items-center justify-center">
      <div className="w-1/3 bg-white rounded shadow p-10">
        <h1 className="font-bold text-center text-3xl">Change Password</h1>
        <hr className="m-5" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label>Old password</label>
            <input
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              type="password"
              className="border rounded shadow-sm w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label>New Password</label>
            <input
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              type="password"
              className="border rounded shadow-sm w-full"
            />
          </div>
          {/* <div className="flex flex-col mb-3">
            <label>Confirm Password</label>
            <input
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              className="border rounded shadow-sm w-full"
            />
          </div> */}
          <div className="flex flex-col mt-5">
            <input
              type="submit"
              className="bg-red-500 rounded py-3 text-white font-bold hover:bg-red-700 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
