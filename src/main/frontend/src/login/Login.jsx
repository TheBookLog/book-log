import React from "react";
import styled from "styled-components";
import logo from "./logo.png";
import kakao_login from "./kakao_login.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const LeftRight = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #CCEBFF;
    z-index: -1; /* 배경이 맨 뒤에 오도록 설정 */
`;

const Area = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction : column;
    align-items: center;
    background-color: white;
    width : 70%;
    margin : 0 auto;
    height: 100vh; /* 화면 전체를 차지하도록 설정 */
    padding-top: 40px; /* 상단 여백 */
    position: relative;
    z-index: 1; /* Area가 LeftRight 위에 표시되도록 설정 */
`;

const Logo = styled.img`
    width: 270px;  /* 로고 크기 조정 */
    height: 200px;  /* 비율에 맞게 높이를 자동 조정 */
    margin-top : 70px;
`;

const Text = styled.h4`
    font-size : 25px;
    text-align : center;
`;

const Image = styled.img`
    align-items : center;
    width : 250px;
    height : 60px;
    margin-top : 10px;
`;
function Login() {
    const REACT_APP_K_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const K_REDIRECT_URI = `http://localhost:8080/api/auth/kakao-login/callback`;
    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

    console.log(process.env.REACT_APP_REST_API_KEY);
    const redirect = () => {
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <Container>
            <LeftRight />
            <Area>
                <Logo src={logo} alt="로고" />
                <Text>
                간단하게 SNS로 로그인하고 <br />
                다양한 책 정보와 독서 기록을 관리해보세요
                </Text>
                <Image src={kakao_login} alt="로그인" onClick={() => {redirect();}} />
            </Area>
        </Container>
    );
}

export default Login;
