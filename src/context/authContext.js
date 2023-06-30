import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { LOGIN, REGISTER } from "../services/auth";
import { useToast } from "../hooks/useToast";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const toast = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogin = async (data) => {
    try {
      const res = await LOGIN(data.email, data.password);
      const tokenn = res.data.userDetails.token;
      setToken(tokenn);
      localStorage.setItem("token", tokenn);
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
      toast.success("Login berhasil");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleRegister = async (data) => {
    try {
      const res = await REGISTER(data.email, data.username, data.password);
      const tokenn = res.data.userDetails.token;
      setToken(tokenn);
      localStorage.setItem("token", tokenn);
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
      toast.success("Register berhasil");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    navigate("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
