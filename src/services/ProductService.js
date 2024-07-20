import axios from "axios";

export const getAllProduct = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `http://localhost:3001/api/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `http://localhost:3001/api/product/get-all?limit=${limit}`
    );
  }
  return res.data;
};

export const getProductType = async (type) => {
  if (type) {
    const res = await axios.get(
      `http://localhost:3001/api/product/get-all?filter=type&filter=${type}`
    );
    return res.data;
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/product/create`,
    data
  );
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `http://localhost:3001/api/product/get-details/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(
    `http://localhost:3001/api/product/get-details/${id}`,
    data
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `http://localhost:3001/api/product/delete/${id}`
  );
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(`http://localhost:3001/api/product/get-all-type`);
  return res.data;
};
