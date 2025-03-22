import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Redirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("redirect");
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");     

        console.log("카카오 인가 코드:", code);  // ✅ 인가 코드가 정상적으로 받아지는지 확인

        if (code) {
            axios
                .post("http://localhost:8080/api/auth/kakao-login/callback", 
                    new URLSearchParams({ code }),  // ✅ `x-www-form-urlencoded` 형식으로 변경
                    { 
                        withCredentials: true,
                        headers: { "Content-Type": "application/x-www-form-urlencoded" }  // ✅ 헤더 추가
                    }
                )
                .then((response) => {
                    console.log("로그인 성공: ", response.data);

                    const { isNewUser, kakaoId } = response.data;  // ✅ `isNewUSer` → `isNewUser`로 수정

                    if (!isNewUser) {
                        axios
                            .post("http://localhost:8080/api/auth/issue-token", 
                                { kakaoId }, 
                                { withCredentials: true }
                            )
                            .then((jwtResponse) => {
                                console.log("JWT 발급 성공: ", jwtResponse.data);
                                localStorage.setItem("accessToken", jwtResponse.data.accessToken);
                                localStorage.setItem("userId", jwtResponse.data.userId);
                                navigate("/home");
                            })
                            .catch((jwtError) => {
                                console.error("JWT 발급 실패:", jwtError);
                            });
                    } else {
                        navigate("/addinformation", { state: { kakaoId } });
                    }
                })
                .catch((error) => {
                    console.error("로그인 실패: ", error);
                });
        } else {
            console.error("인가 코드가 없습니다.");
        }
    }, [navigate]);

    return <div>로그인 중입니다...</div>;
}

export default Redirect;
