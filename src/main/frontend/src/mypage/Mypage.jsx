import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image1 from "./image1.png";
import image from "./image.png";
import Modal from "../component/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { Button, SubmitButton } from "../component/Button";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Container = styled.div`
    display : flex;
    flex-direction : column;
`;

const Main2 = styled.div`
    display : flex;
    flex-direction : row;
`;

const Text = styled.h5`
    font-size: ${(props) => props.size || "12px"};
    margin : 2px 0;
    margin-top : ${( props ) => props.mt || "0px"};
    margin-bottom : ${( props ) => props.mb || "0px"};
    cursor : ${( props ) => props.cs || "pointer"};
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
    z-index : 1;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    width: 440px;
    margin-top : 5px;
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
    display : flex;
    flex-direction : row;
    gap : 30px;
    padding : 10px 20px;
    justify-content : space-between;
    margin-top : 25px;
`;

const Label = styled.label`
    font-size : 18px;
    margin-bottom : 3px;
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
    width : 80%;
    margin : 0 500px;
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = localStorage.getItem("userId");

    const [formData, setFormData ] = useState({
        nickname : "",
        gender : "",
        ageGroup : "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nicknameError, setNicknameError] = useState("");
    
    useEffect(() => { //기본값이 GET
        fetch(`/api/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("받은 사용자 데이터:",data);
                const genderMap = {
                    MALE : "남성",
                    FEMALE : "여성",
                    UNKNOWN : "기타"
                };

                const ageGroupMap = {
                    AGE_10s : "10대",
                    AGE_20s : "20대",
                    AGE_30s : "30대",
                    AGE_40s : "40대",
                    AGE_50s : "50대",
                    AGE_60_PLUS : "60대 이상",
                };

                setFormData({
                    nickname : data.nickname || "",
                    gender : data.gender || "",
                    ageGroup : data.ageGroup || "",
                });
            })
            .catch((err) => console.error("Error : ",err));
    },[id]);

    const handleNinknameChange = async (e) => {
        const newNickname = e.target.value;
        setFormData({...formData, nickname : newNickname});

        if (newNickname.trim()==="") return;

        try {
            const response = await fetch(`/api/users/check-username?username=${newNickname}`);
            const data = await response.json();
            if (!data.available) {
                setNicknameError("이미 사용 중인 닉네임입니다.");
            } else {
                setNicknameError("");
            }
        } catch (error) {
            console.error("Error : ",error);
        }
    };

    const handleGenderClick = (gender) => {
        setFormData({ ...formData, gender });
    };

    const handleAgeGroupClick = (ageGroup) => {
        setFormData({ ...formData, ageGroup });
    };

    const handleLogout = async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        dispatch(logout());

        alert("로그아웃되었습니다.");
        navigate("/");
    }

    const handleDeleteAccount = async (e) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method : "DELETE",
            });
            if (response.ok) {
                alert("회원 탈퇴가 완료되었습니다.");
                navigate("/home");
            } else {
                alert("회원 탈퇴 실패");
            }
        } catch (error) {
            console.error("Delete account error : ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const genderMap = {
            "남성" : "MALE",
            "여성" : "FEMALE",
            "기타" : "UNKNOWN"
        };
        
        const ageGroupMap = {
        "10대" : "AGE_10s",
        "20대" : "AGE_20s",
        "30대" : "AGE_30s",
        "40대" : "AGE_40s",
        "50대" : "AGE_50s",
        "60대 이상" : "AGE_60_PLUS",
        };
        
        const payload = {
            username : formData.nickname,
            gender : genderMap[formData.gender],
            ageGroup : ageGroupMap[formData.ageGroup]
        };

        try {
            const response = await fetch(`/api/users/${id}`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(payload),
            });
            if(response.ok) {
                alert("성공적으로 수정되었습니다. !");
            } else {
                alert("수정에 실패하였습니다.");
            }
        } catch (error) {
            console.error("Error : ", error);
        }
    };

    
    const [backColor, setBackColor] = useState("rgba(0, 0, 0, 0.2)");
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const navigateToProfile = () => {
        navigate("/profile");
    }

    return (
        <Container>
            <Header />
            <Main>
                <Text size="25px" cs="pointer">
                    My Page
                </Text>
                <Main2>
                    <Text mt="13px" cs="pointer">프로필 관리</Text>
                    <Center width="18px" height="18px" mt="14px" ml="3px" src={image} alt="관리" />
                </Main2>
                <Text mt="3px" cs="pointer" onClick={handleLogout}>로그아웃</Text>
            </Main>
                <Div>
                    <Center mt="10px" src={image1} alt="회원" />
                    <Text size="25px" mt="7px">유저 닉네임</Text>
                </Div>
                <FormContainer onSubmit={handleSubmit}>
                    <Text size="20px" mt="50px" mb="10px">프로필 설정</Text>
                    <Label htmlFor="ninkname">닉네임</Label>
                    <Input
                        type="text"
                        id="ninkname"
                        value={formData.nickname}
                        onChange={handleNinknameChange}
                        required
                    />
                    {nicknameError && <Text size="12px" style={{ color : "red"}}>{nicknameError}</Text>}
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
                                        <SubmitButton bgColor="#CCEBFF" onClick={handleDeleteAccount}>확인</SubmitButton>
                                    </ModalButtonContainer>
                                </ModalContent>
                            </Modal>
                        <SubmitButton bgColor="#CCEBFF">수정</SubmitButton>
                    </ButtonContainer>
                </FormContainer>
            
            
        </Container>
    )

}
export default Mypage;