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
                .post("http://localhost:8080/api/auth/kakao-login/callback", { code }, { withCredentials : true})
                .then((response) => {
                    console.log("로그인 성공: ", response.data);

                    const { isNewUSer, kakaoId } = response.data;

                    if (!isNewUSer) {
                        axios
                            .post("http://localhost:8080/api/auth/issue-token", { kakaoId }, { withCredentials : true })
                            .then((jwtResponse) => {
                                console.log("JWT 발급 성공 : ", jwtResponse.data);
                                localStorage.setItem("accessToken", jwtResponse.data.accessToken);
                                localStorage.setItem("userId", jwtResponse.data.userId);
                                navigate("/home");
                            })
                            .catch((jwtError) => {
                                console.error("JWT 발급 실패:", jwtError);
                            });
                    } else {
                        navigate("/addinformation", { state : {kakaoId}});
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