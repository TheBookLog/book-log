import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Redirect() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("현재 URL : ", window.location.href);
        
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const userId = params.get("userId");
        const isNew = params.get("isNew");

        console.log("저장할 토큰 : ",token);
        console.log("값:", isNew);

        if (token && userId) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userId", userId);
            console.log("저장된 토큰: ", localStorage.getItem("accessToken"));

            dispatch(login()); //redux 로그인상태 업데이트

            setTimeout(()=>{
                if (isNew === "true") {
                    navigate("/addinformation");
                } else {
                    navigate("/");
                }
            }, 500);

        } else {
            console.error("카카오 로그인 실패 또는 토큰 누락");
            navigate("/login"); // 실패 시 로그인 페이지로 리다이렉션
        }
    }, [navigate, dispatch]);

    return (
        <div>
            로그인 중입니다...
        </div>
    );
}

export default Redirect;