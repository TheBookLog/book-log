import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.png";
import Modal from "../component/Modal";

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
    background-color: #ccebff;
    z-index: -1; /* 배경이 맨 뒤에 오도록 설정 */
`;

const Area = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 70%;
    margin: 0 auto;
    height: 100vh; /* 화면 전체를 차지하도록 설정 */
    padding-top: 40px; /* 상단 여백 */
    position: relative;
    z-index: 1; /* Area가 LeftRight 위에 표시되도록 설정 */
`;

const Logo = styled.img`
    width: 200px; /* 로고 크기 조정 */
    height: 120px; /* 비율에 맞게 높이를 자동 조정 */
    margin-top: 50px;
`;

const Text = styled.h5`
    font-size: 18px;
    text-align: center;
`;

const FormContainer = styled.form`
    margin-top: 10px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Label = styled.label`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    width: 440px;
    margin-top : 10px;
    background-color : #EBF1F5;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top : 10px;
`;

const Button = styled.button`
    padding: 9px 13px;
    font-size: 15px;
    border: ${(props) => (props.active ? "3px solid #5AA2D3" : "2px solid transparent")};
    border-radius: 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "#CCEBFF" : "#EBF1F5")}; /* 배경색 고정 */
    transition: border 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #ddd;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 15px;
    border: none;
    background-color : ${(props) => props.backgroundColor || "#25a745"};
    border-radius: 10px;
    cursor: pointer;
    align-items : center;

    &:hover {
        background-color: #ddd;
    }
`;

const ButtonContainer = styled.div`
    flex-direction : row;
    align-items : center;
    display : flex;
    gap : 50px;
    padding : 10px 20px;
    justify-content: center;
    margin-top : 25px;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 내용 정렬 */
    justify-content: center; /* 수직 중앙 정렬 */
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`;

const ModalButtonContainer = styled.div`
    display: flex;
    justify-content: center; /* 버튼을 가로로 중앙 배치 */
    width: 100%;
    margin-top: 10px;
`;

function AddInformation() {
    const [formData, setFormData] = useState({
        ninkname: "",
        gender: "",
        ageGroup: "",
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

    return (
        <Container>
            <LeftRight />
            <Area>
                <Logo src={logo} alt="로고" />
                <Text>
                    추가 정보를 입력하고 <br /> 보다 정확한 추천을 받아보세요 !
                </Text>
                <FormContainer onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="nickname">닉네임</Label>
                        <br />
                        <Input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={formData.ninkname}
                            onChange={(e) => setFormData({ ...formData, ninkname: e.target.value })}
                            required
                        />
                    </div>
                    <div>
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
                                active={formData.gender === "여성"}
                                onClick={() => handleGenderClick("여성")}
                            >
                                여성
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div>
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
                    </div>

                    {/* <SubmitButton type="submit">제출</SubmitButton> */}
                    <ButtonContainer>
                        <SubmitButton backgroundColor="#D9D9D9">나중에 하기</SubmitButton>
                        <SubmitButton backgroundColor="#CCEBFF" onClick={openModal}>저장</SubmitButton>
                        <Modal isOpen={isModalOpen} closeModal={closeModal}>
                            <ModalContent>
                                <p>이미 사용중인 닉네임입니다.</p>
                                <ModalButtonContainer>
                                    <SubmitButton backgroundColor="#CCEBFF" onClick={closeModal} style={{width : "80px"}}>확인</SubmitButton>
                                </ModalButtonContainer>
                            </ModalContent>
                        </Modal>
                    </ButtonContainer>
                </FormContainer>
            </Area>
        </Container>
    );
}

export default AddInformation;
