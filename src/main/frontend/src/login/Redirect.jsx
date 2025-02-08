import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Redirect() {
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");     

        if (code) {
            axios
                .get(`http://localhost:8080/api/auth/kakao-login/callback?code=${code}`, {
                    withCredentials: true, // 쿠키 포함 요청
                })
                .then((response) => {
                    console.log("로그인 성공: ", response.data);

                    if(response.data.accessToken) {
                        document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
                        navigate("/addinformation")
                    }
                })
                .catch((error) => {
                    console.error("로그인 실패: ", error);
                });
        }
    }, [navigate]);
    
    return (
        <div>
            로그인 중입니다.
        </div>
    )
}
export default Redirect;