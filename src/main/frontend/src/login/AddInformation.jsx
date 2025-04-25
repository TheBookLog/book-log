import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.png";
import Modal from "../component/Modal";
import { Button, SubmitButton } from "../component/Button";
import axios from "axios";

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
    outline : none;
    autocomplete : false;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top : 10px;
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

const ErrorText = styled.p`
    color : red;
    font-size : 14px;
    margin-top : 5px;
`;

function AddInformation() {
    const navigate = useNavigate();
    const location = useLocation();

    const kakaoId = location.state?.kakaoId || null;
    const [formData, setFormData] = useState({
        nickname: "",
        gender: "",
        ageGroup: "",
    });

    const [nicknameError, setNicknameError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    },[]);
    
    useEffect(() => {
        if (formData.nickname.trim() === "") {
            setNicknameError(false);
            return;
        }

        const checkNickname = setTimeout(async () => {
            try {
                const response = await axios.get(
                    `/api/users/check-username?username=${formData.nickname}`
                );
                setNicknameError(response.data.exists);
            } catch (error) {
                console.error("닉네임 중복 확인 오류:", error);
            }
        }, 500);
        return() => clearTimeout(checkNickname);
    },[formData.nickname]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleGenderClick = (genderKor) => {
        const genderMap = {
            "남성": "MALE",
            "여성": "FEMALE"
        };
        setFormData((prevData) => ({
            ...prevData,
            gender: genderMap[genderKor],
        }));
    };

    const handleAgeGroupClick = (ageKor) => {
        const ageGroupMap = {
            "10대": "AGE_10s",
            "20대": "AGE_20s",
            "30대": "AGE_30s",
            "40대": "AGE_40s",
            "50대": "AGE_50s",
            "60대 이상": "AGE_60_PLUS"
        };
        setFormData((prevData) => ({
            ...prevData,
            ageGroup : ageGroupMap[ageKor]
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nicknameError) {
            openModal();
            return;
        }
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            console.error("인증 정보 없음");
            navigate("/login");
            return;
        }

        const userIdFromStrage = localStorage.getItem("userId");
        const userId = kakaoId || userIdFromStrage;

        if (!userId) {
            console.error("사용자 정보 없음");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.put(
                `/api/users/${userId}`,
                {
                    nickname : formData.nickname,
                    gender : formData.gender,
                    ageGroup : formData.ageGroup,
                },
                {
                    headers : {Authorization : `Bearer ${accessToken}`},
                    withCredentials : true,
                }

            );
            console.log("사용자 정보 업데이트 성공 : ",response.data);
            navigate("/");
        }
        catch (error) {
            console.log("사용자 정보 업데이트 실패 : ", error);
        }
    };           

    
    const [backColor, setBackColor] = useState("rgba(0, 0, 0, 0.2)");

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
                            value={formData.nickname}
                            onChange={handleChange}
                            required
                        />
                        {nicknameError && (
                            <ErrorText>이미 사용 중인 닉네임입니다.</ErrorText>
                        )}
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
                        <SubmitButton bgColor="#D9D9D9" type="button" onClick={()=>navigate("/home")}>나중에 하기</SubmitButton>
                        <SubmitButton bgColor="#CCEBFF" type="submit">저장</SubmitButton>
                        <Modal isOpen={isModalOpen} closeModal={closeModal}>
                            <ModalContent>
                                <p>이미 사용중인 닉네임입니다.</p>
                                <ModalButtonContainer>
                                    <SubmitButton bgColor="#CCEBFF" onClick={closeModal} style={{width : "80px"}}>확인</SubmitButton>
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
