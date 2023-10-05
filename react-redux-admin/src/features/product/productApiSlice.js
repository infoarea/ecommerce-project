import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get All brand
export const getAllBrand = createAsyncThunk("product/getAllBrand", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/brand", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Create brand
export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/brand",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete brand
export const deleteBrand = createAsyncThunk(
  "product/deleteBrand",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/brand/${id}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update brand
export const updateBrand = createAsyncThunk(
  "product/updateBrand",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/brand/${id}`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update brand
export const updateBrandStatus = createAsyncThunk(
  "product/updateBrandStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/brand/brand-status/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Create Product Tag
export const createProductTag = createAsyncThunk(
  "user/createProductTag",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/tag",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Get All Product Tag
export const getAllProductTag = createAsyncThunk(
  "user/getAllProductTag",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/tag", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete Product Tag
export const deleteProductTag = createAsyncThunk(
  "user/deletProductTag",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/tag/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Delete Product Tag
export const updateProductTag = createAsyncThunk(
  "user/updateProductTag",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/tag/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Update Tag Status
export const updateTagStatus = createAsyncThunk(
  "product/updateTagStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/tag/tag-status/${id}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Get All Category
export const getAllCategory = createAsyncThunk(
  "product/getAllCategory",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/category",
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
