import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers, updateStatus } from "../../utils/api";
import { logout } from "../../App/authSlice";

function Admin() {
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await listUsers(token);
      setUsers(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleStatus = async (userId) => {
    try {
      await updateStatus(userId, token);
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId, token);
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-red-100">
      <div className="rounded border bg-white p-6 w-3/4 shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-center font-bold text-3xl">Welcome Admin</h1>
          <button
            className="px-3 py-2 bg-red-500 rounded shadow text-white font-bold hover:bg-red-600"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
        <hr className="my-4" />
        <table className="w-full text-center border-collapse">
          <thead className="bg-slate-500 text-white">
            <tr>
              <th className="p-2">Sl No</th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-slate-100 even:bg-slate-200">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td
                  className={`p-2 ${
                    user?.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {user?.status}
                </td>
                <td className="p-2">
                  <button
                    className={`px-3 py-1 ${
                      user?.status ? "bg-red-500" : "bg-green-500"
                    } ${
                      user?.status ? "hover:bg-red-600" : "hover:bg-green-600"
                    } text-white rounded shadow`}
                    onClick={() => handleStatus(user._id)}
                  >
                    {user.status ? "Block" : "Unblock"}
                  </button>
                </td>
                <td className="p-2">
                  <button className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
