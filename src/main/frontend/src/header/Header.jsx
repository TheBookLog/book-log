import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.png";
import image from "./image.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 10px 20px;
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    background-color : white;
    z-index : 1000;
    // box-shadow : 0 2px 2px rgba(0,0,0,0.1);
`;

const Image = styled.img`
    width : 35px;
    height : 35px;
    position : absolute;
    top : 13px;
    right : 70px;
    cursot : pointer;
`;

const Logo = styled.img`
    width : 80px;
    height : 50px;
    position : absolute;
    top : 7px;
    left : 20px;
`;

const Nav = styled.nav`
    display : flex;
    gap : 100px;
    margin-left : 150px;
`;

const NavLink = styled.div`
    text-decoration : none;
    color : black;
    font-size : 18px;
    margin-top : 18px;
    cursor : pointer;
`;


function Header() {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    }

    const navigateToBookLog = () => {
        navigate("/booklog");
    }

    const navigateToLogin = () => {
        navigate("/login");
    }
    return (
        <Container>
            <Logo src={logo} alt="로고"/>
            <Nav>
                <NavLink onClick={navigateToHome}>HOME</NavLink>
                <NavLink onClick={navigateToBookLog}>BOOKLOG</NavLink>
            </Nav>
            <Image src={image} alt="회원" onClick={navigateToLogin}/>
        </Container>
    );
}

export default Header;