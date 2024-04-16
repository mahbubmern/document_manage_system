import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// create api thunk

// get all user

export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  try {
    const response = await API.get(`/api/v1/user`);
    const sortedData = response.data.user.reverse();
    return sortedData;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update user

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const response = await API.patch(`/api/v1/user/${data._id}`, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
