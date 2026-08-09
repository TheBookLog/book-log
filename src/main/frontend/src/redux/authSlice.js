import { createSlice } from "@reduxjs/toolkit";

// JWT는 HttpOnly 쿠키라 JS에서 못 읽는다. 화면 표시용 상태만 userId로 판단하고
// 실제 인증 여부는 서버가 판정한다.
const initialState = {
    isLoggedIn : !!localStorage.getItem("userId"),
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
            localStorage.removeItem("userId");
        },
    },
});

export const { login, logout} = authSlice.actions; //액션 생성자
export default authSlice.reducer;