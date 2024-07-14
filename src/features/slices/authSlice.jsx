import { createSlice } from "@reduxjs/toolkit";

const demoUsers = [
  {
    name: "admin",
    password: "123",
    role: "admin",
    image: "",
  },
  {
    name: "customer",
    password: "123",
    role: "customer",
    image: "",
  },
];

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      role: "",
      image: "",
      authUser: false,
    },
  },
  reducers: {
    login(state, action) {
      const userId = action.payload;
      const demoUser = demoUsers.find(
        (user) => user.name === userId.name && user.password === userId.password
      );

      if (demoUser) {
        state.user = { ...demoUser, authUser: true };
        sessionStorage.setItem("authUser", JSON.stringify(state.user));
      } else {
        state.user.authUser = false;
      }
    },
    logout(state) {
      state.user = {
        name: "",
        password: "",
        role: "",
        image: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
