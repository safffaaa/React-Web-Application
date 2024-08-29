import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const loginApi = async (formData) => {
  try {
    const response = await axiosInstance.post("login/", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const Register = async (formData) => {
  try {
    const res = await axiosInstance.post("SignUp/", formData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchProfile = async (token) => {
  try {
    const res = await axiosInstance.get("profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (token, formData) => {
  try {
    const res = await axiosInstance.post("editProfile/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const ChangePassword = async (token, formData) => {
  try {
    const res = await axiosInstance.post("changePass/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const listUsers = async (token) => {
  try {
    const res = await axiosInstance.get("admin/list-users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatus = async (userId, token) => {
  try {
    const res = await axiosInstance.patch(
      `admin/update-status/${userId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const res = await axiosInstance.delete(`admin/delete-user/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
