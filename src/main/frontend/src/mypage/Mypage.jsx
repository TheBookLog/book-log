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
    cursor : ${( props ) => props.cs || "none"};
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

const ButtonGroup = styled.div`
    display : flex;
    flex-wrap : wrap;
    margin-top : 10px;
    gap : 10px;
`;

const ButtonContainer = styled.div`
    flex-direction : row;
    align-items : center;
    dispay : flex;
    gap : 50px;
    padding : 10px 20px;
    justify-content : center;
    margin-top : 25px;
`;

const Label = styled.label`
    font-size : 18px;
    margin-bottom : 10px;
    margin-top : 10px;
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
    max-width : 500px;
    justify-content : flex-start;
    margin : 0 200px;
`;

const ModalContent = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    padding : 20px;
    background-color : white;
    border-radius : 10px;
`;

const ModalButtonContainer = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : row;
    align-items : center;
    gap : 70px;
    margin-top : 20px;
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
                <FormContainer onSubmit={handleSubmit}>
                    <Text size="18px" mt="15px">프로필 설정</Text>
                    <Label htmlFor="ninkname">닉네임</Label>
                    <Input
                        type="text"
                        id="ninkname"
                        value={formData.ninkname}
                        onChange={(e) => setFormData({...formData, ninkname : e.target.value})}
                        required
                    />
                    <Label>성별</Label>
                    <ButtonGroup>
                        <Button 
                            type="button"
                            active={formData.gender === "남성"}
                            onClick={() => handleGenderClick("남성")}
                        >
                            남성
                        </Button>
                        <Button
                            type="button"
                            active={(formData.gender === "여성")}
                            onClick={() => handleGenderClick("여성")}
                        >
                            여성
                        </Button>
                    </ButtonGroup>
                    <Label>연령대</Label>
                    <ButtonGroup>
                        {["10대", "20대", "30대", "40대", "50대", "60대 이상"].map((age) => (
                            <Button
                                key={age}
                                type="button"
                                active={formData.ageGroup === age}
                                onClick={() => handleAgeGroupClick(age)}
                            >
                                {age}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <ButtonContainer>
                        <Text size="13px" cs="pointer" onClick={openModal}>회원탈퇴</Text>
                        <Modal isOpen={isModalOpen} closeModal={closeModal}>
                            <ModalContent>
                                <Text size="25px">정말 탈퇴하시겠어요?</Text>
                                <Text size="16px" mt="20px">탈퇴 버튼 선택 시, 계정은 <br /> 삭제되며 복구되지 않습니다.</Text>
                                <ModalButtonContainer>
                                    <SubmitButton bgColor="#D9D9D9" onClick={closeModal}>취소</SubmitButton>
                                    <SubmitButton bgColor="#CCEBFF" >확인</SubmitButton>
                                </ModalButtonContainer>
                            </ModalContent>
                        </Modal>
                        <SubmitButton bgColor="#CCEBFF">수정하기</SubmitButton>
                    </ButtonContainer>
                </FormContainer>
            </Main>
            
        </Container>
    )

}
export default Mypage;