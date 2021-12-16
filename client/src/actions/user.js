import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { API_URL } from "../config";
import { toast } from "react-hot-toast";

// Registration
export const registration = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      email,
      password,
    });
    toast.success(`User ${email} registered`);

    console.log(response.data.message);
  } catch (e) {
    console.log(e);
    toast.error(`${e.message}`);
  }
};

// Login
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, {
        email,
        password,
      });
      const { user, token } = response.data;
      dispatch(setUser(user));
      localStorage.setItem("token", token);
      toast.success(`Hello ${email}!`);
    } catch (e) {
      console.log(e);
      toast.error(`${e.message}`);
    }
  };
};

// Auth
export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
      toast.success(`Authorization success`);
    } catch (e) {
      localStorage.removeItem("token");
      console.log(e);
      toast.error(`Not authorized`);
    }
  };
};
