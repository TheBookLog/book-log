import React, { useState } from "react";
import styled from "styled-components";
import image1 from "./image1.png";
import image from "./image.png";
import Modal from "../component/Modal";
import { useNavigate } from "react-router-dom";
import { Button, SubmitButton } from "../component/Button";

const Container = styled.div`
    display : flex;
    flex-direction : column;
`;

const Main2 = styled.div`
    display : flex;
    flex-direction : row;
`;

const Text = styled.h5`
    font-size: ${(props) => props.size || "15px"};
    margin : 2px 0;
    margin-top : ${( props ) => props.mt || "0px"};
`;

const Main = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    margin-left : 20px;
    margin-top : 80px;
    z-index : 2;
    position : relative;
`;

const Div = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    width: 440px;
    margin-top : 10px;
    background-color : #EBF1F5;
    outline : none;
    autocomplete : false;
`;

const Header = styled.div`
    background-color : #ccebff;
    text-align : center;
    display : flex;
    height : 250px;
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    z-index : 1;
`;

const Center = styled.img`
    width : ${(props) => props.width || "50px"};
    height : ${(props) => props.height || "50px"};
    margin-top : ${(props) => props.mt || "0px"};
    margin-left : ${(props) => props.ml || "0px"};
`;

const FormContainer = styled.form`
    display : flex;
    flex-direction : column;
`;

function Mypage() {
    const [formData, setFormData ] = useState({
        ninkname : "",
        gender : "",
        ageGroup : "",
    });
    const handleGenderClick = (gender) => {
        setFormData({ ...formData, gender });
    };

    const handleAgeGroupClick = (ageGroup) => {
        setFormData({ ...formData, ageGroup });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        alert("성공적으로 제출되었습니다.");
        // 백엔드 로직
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [backColor, setBackColor] = useState("rgba(0, 0, 0, 0.2)");
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate("/profile");
    }

    return (
        <Container>
            <Header />
            <Main>
                <Text size="25px">
                    My Page
                </Text>
                <Main2>
                    <Text mt="13px">프로필 관리</Text>
                    <Center width="18px" height="18px" mt="14px" ml="3px" src={image} alt="관리" />
                </Main2>
                <Text mt="3px">로그아웃</Text>
                <Div>
                    <Center mt="10px" src={image1} alt="회원" />
                    <Text size="18px" mt="7px">유저 닉네임</Text>
                </Div>

            </Main>
            
        </Container>
    )

}
export default Mypage;