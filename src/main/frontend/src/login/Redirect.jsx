import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const userId = params.get("userId");

        if (token && userId) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userId", userId);
            navigate("/home");  // 홈이나 원하는 페이지로 이동
        } else {
            console.error("카카오 로그인 실패 또는 토큰 누락");
            navigate("/login"); // 실패 시 로그인 페이지로 리다이렉션
        }
    }, [navigate]);

    return (
        <div>
            로그인 중입니다...
        </div>
    );
}

export default Redirect;