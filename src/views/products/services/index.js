import axios from "axios";

const base = process.env.REACT_APP_API;

export const getProduct = async () => {
  try {
    let product = await axios.get(`${base}/products/mvp`);
    return Promise.resolve(product.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const reviewProduct = async (id, data) => {
  try {
    let product = await axios.post(`${base}/products/review/${id}`, data);
    return Promise.resolve(product.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
