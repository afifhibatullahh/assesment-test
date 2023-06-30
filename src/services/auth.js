import axios from "./index";

const LOGIN = async (email_username, password) => {
  const data = {
    mail: email_username,
    password,
  };
  return await axios.post("auth/login", data).then((response) => response);
};

const REGISTER = async (mail, username, password) => {
  const data = {
    mail: mail,
    username: username,
    password,
  };
  return await axios.post("auth/register", data).then((response) => response);
};

const LOGOUT = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return await axios.get("auth/logout", { headers });
};

export { LOGIN, LOGOUT, REGISTER };
