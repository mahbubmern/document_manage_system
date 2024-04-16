// create slice

import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, updateUser } from "./userApiSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setEmptyMessage : (state) =>{
      state.message = null,
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user = action.payload.user;
        state.message = action.payload.message
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })

      //get All User

      .addCase(getAllUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      ;
  },
});



//selector export

export const userSelector = (state) => state.user;

//actions export

export const {setEmptyMessage} = userSlice.actions;

//reducer export

export default userSlice.reducer;

