import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : !!localStorage.getItem("accessToken"), //기본값 : 로그아웃 상태
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state) => {
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem("accessToken");
            
        },
    },
});

export const { login, logout} = authSlice.actions; //액션 생성자
export default authSlice.reducer;