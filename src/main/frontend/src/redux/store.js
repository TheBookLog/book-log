import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer : {
        auth : authReducer, //authSlice를 store에 등록
    },
});

export default store;