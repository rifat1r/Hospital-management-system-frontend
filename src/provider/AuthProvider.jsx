import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Cookie from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (data) => {
    setLoading(true);
    const res = await axiosPublic.post("/auth/register", data);
    return res;
  };

  const loginUser = async (data) => {
    setLoading(true);
    const res = await axiosPublic.post("/auth/login", data);
    return res;
  };

  const logoutUser = async () => {
    const res = await axiosPublic.get("/auth/logout");
    return res;
  };

  // fetch the user data
  const fetchUser = async () => {
    const token = Cookie.get("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      console.log("user refetching...");
      const res = await axiosPublic.get("/auth/profile");
      setUser(res.data.user);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const authInfo = {
    createUser,
    loginUser,
    loading,
    user,
    setLoading,
    logoutUser,
    fetchUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
