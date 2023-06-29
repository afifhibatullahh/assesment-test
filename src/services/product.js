import axios from "./index";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const GET_PRODUCT = async (id) => {
  return await axios.get(`product/${id}`, { headers });
};

const GET_PRODUCTS = async (page, search, signal) => {
  return await axios.get(`product?page=${page}&search=${search}`, {
    headers,
    signal: signal,
  });
};

const CREATE_PRODUCT = async (body) => {
  return await axios.post("product", body, { headers });
};

const UPDATE_PRODUCT = async (id, body) => {
  return await axios.put(`product/${id}`, body, { headers });
};

const DELETE_PRODUCT = async (id) => {
  return await axios.delete(`product/${id}`, { headers });
};

export {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
