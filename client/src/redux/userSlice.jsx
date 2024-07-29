import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected: false,
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    token: "",
    onlineUser: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.profile_pic = action.payload.profile_pic;
        console.log("action", action.payload)
      },
      setToken: (state, action) => {
        state.token = action.payload;
      },
      logout: (state) => {
        state._id = "";
        state.name = "";
        state.email = "";
        state.profile_pic = "";
        state.token = "";
        state.socketConnection = null;
      },
      setOnlineUser: (state, action) => {
        state.onlineUser = action.payload;
      },
      setSocketConnectionStatus: (state, action) => {
        state.isConnected = action.payload;
      },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setOnlineUser, setSocketConnectionStatus } = userSlice.actions;

export default userSlice.reducer;
