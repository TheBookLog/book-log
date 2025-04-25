import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./logo.png";
import image1 from "./image1.png"; // 로그인된 경우
import image from "./image.png";   // 로그인되지 않은 경우
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout} from "../redux/authSlice";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1000;
`;

const Image = styled.img`
    width: ${(props) => (props.isLoggedIn ? "35px" : "30px")};
    height: 35px;
    position: absolute;
    top: 13px;
    right: 70px;
    cursor: pointer;
`;

const Logo = styled.img`
    width: 80px;
    height: 50px;
    position: absolute;
    top: 7px;
    left: 20px;
`;

const Nav = styled.nav`
    display: flex;
    gap: 100px;
    margin-left: 150px;
`;

const NavLink = styled.div`
    text-decoration: none;
    color: black;
    font-size: 18px;
    margin-top: 15px;
    cursor: pointer;
`;

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [localStorageToken, setLocalStorageToken] = useState(localStorage.getItem("accessToken"));

    useEffect(() => {
        // 로그인 여부를 LocalStorage에서 확인
        const accessToken = localStorage.getItem("accessToken");
        setLocalStorageToken(accessToken);

        console.log("현재 토큰:", accessToken);
        console.log("redux 상태 : ", isLoggedIn);

        if (accessToken) {
            dispatch(login());
        } else {
            dispatch(logout());
        }
    }, [dispatch]);

    const navigateToHome = () => {
        navigate("/");
    };

    const navigateToBookLog = () => {
        navigate("/booklog");
    };

    const navigateToMyPage = () => {
        navigate("/mypage");
    };

    // 카카오 로그인 리디렉트 함수
    const redirectToKakaoLogin = () => {
        window.location.href = "http://localhost:8080/login/oauth2/code/kakao";
    };    

    const handleImageClick = () => {
        if (isLoggedIn) {
            navigateToMyPage(); // 로그인된 경우 마이페이지로 이동
        } else {
            redirectToKakaoLogin(); // 로그인되지 않은 경우 카카오 로그인 진행
        }
    };

    return (
        <Container>
            <Logo src={logo} alt="로고" />
            <Nav>
                <NavLink onClick={navigateToHome}>HOME</NavLink>
                <NavLink onClick={navigateToBookLog}>BOOKLOG</NavLink>
            </Nav>
            <Image src={isLoggedIn ? image1 : image} alt="회원" onClick={handleImageClick} />
        </Container>
    );
}

export default Header;
