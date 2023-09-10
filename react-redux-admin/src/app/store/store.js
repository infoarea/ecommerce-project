import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice.js"
import userReducer from "../../features/user/userSlice.js"
//Create store
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
    devTools: true
});

export default store;