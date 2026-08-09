import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Redirect() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // JWT는 HttpOnly 쿠키로 들어와 있어 JS에서 읽지 않는다
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("userId");
        const isNewUser = params.get("isNewUser");

        if (!userId) {
            console.error("카카오 로그인 실패");
            navigate("/login");
            return;
        }

        localStorage.setItem("userId", userId);
        dispatch(login()); //redux 로그인상태 업데이트

        navigate(isNewUser === "true" ? "/addinformation" : "/");
    }, [navigate, dispatch]);

    return (
        <div>
            로그인 중입니다...
        </div>
    );
}

export default Redirect;