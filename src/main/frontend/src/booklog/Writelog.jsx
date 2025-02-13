import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { Button, SubmitButton } from "../component/Button";
import image from "./image.png";
import Ad4 from "./Ad4.jpg";

registerLocale("ko", ko);

const Footer = styled.div`
    background-color: #ccebff;
    text-align: center;
    display: flex;
    height: 250px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
`;

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 170px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 70px;
    position: relative;
    width: 100%;
`;

const BookLogContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 15px;
    border: 10px solid #EBF1F5;
    background-color: white;
    z-index: 3;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
`;

const StarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: ${(props) => props.ml || "50px"};
    margin-right: 120px;
`;

const ContentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.jc || "space-between"};
    margin-bottom: 10px;
    gap: 5px;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: space-between;
    width: 100%;
`;

const Image = styled.img`
    width: 350px;
    height: 400px;
    margin-left: 50px;
    margin-top: 40px;
    margin-right: 50px;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 0 30px;
`;

const Input = styled.textarea`
    width: ${(props) => props.width || ""};
    height: ${(props) => props.height || "200px"};
    border-radius: 15px;
    border: 5px solid #EBF1F5;
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
    text-align: start;
    vertical-align: top;
    resize: none;
    outline: none;
`;

const CharCount = styled.div`
    position: absolute;
    bottom: ${(props) => props.bottom || "10px"};
    right: ${(props) => props.right || "100px"};
    font-size: 14px;
    color: black;
`;

const CalendarWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 25px;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 150px;
    height: 15px;
    padding: 10px;
    border: 5px solid #EBF1F5;
    border-radius: 20px;
    font-size: 15px;
    outline: none;
    margin-left: 10px;
    margin-right: 10px;
    z-index: 1;
    background: url(${image}) no-repeat right 10px center;
    background-size: 20px;
    cursor: pointer;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Star = styled.span`
    font-size: 30px;
    color: ${(props) => (props.isFilled ? "gold" : "#dcdcdc")};
    margin-right: 5px;
    transition: color 0.2s;

    &:hover {
        color: gold;
    }
`;

const Text = styled.h6`
    font-size: ${(props) => props.size || "17px"};
    margin-left: ${(props) => props.ml || "0"};
    margin-right: ${(props) => props.mr || "0"};
    margin-bottom: ${(props) => props.mb || "10px"};
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: ${(props) => (props.isOn ? "#4CAF50" : "#f44336")};
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.isOn ? "#45a049" : "#e53935")};
    }
    margin-top : 10px;
`;

const FlexContainer = styled.div`
    display : flex;
    justify-content : flex-end;
    align-items : flex-end;
    margin-top : 20px;
    margin-right : 60px;
`;
    
function Writelog({ maxStars = 5, onRatingChange }) {
    const [charCount, setCharCount] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isPublic, setIsPublic] = useState(false);
    const [quote, setQuote] = useState("");
    const [content, setContent] = useState("");
    // const [userId, setUserId] = useState(null);

    // const navigate = useNavigate();
    const { id } = useParams();
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    const [bookData, setBookData] = useState(null);

    // useEffect(()=>{
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get(`/api/users/${id}`);
    //             setUserId(response.data.id);
    //         } catch (err) {
    //             console.error("사용자 정보를 불러오는데 실패했습니다.",err);
    //             setError("사용자 정보를 불러오는데 실패했습니다.");
    //         }
    //     };
    //     if (id) {
    //         fetchUser();
    //     }
    // },[id]);
    

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const { data } = await axios.get(`/api/books/${id}`);
                console.log(data);
                setBookData(data);
            } catch (error) {
                console.error("책 정보 가져오기 실패 :",error);
            }
        };
        if (id) {
            fetchBookData();
        }
    },[id]);

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
        if (onRatingChange) onRatingChange(rating);
    };

    const handleInputChange = (e, type) => {
        const inputValue = e.target.value;
        setCharCount(inputValue.length);

        if (type === "quote") {
            setQuote(inputValue);
        } else if (type === "content") {
            setContent(inputValue);
        }
    };

    const handleSubmit = async () => {
        if (!accessToken || !userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (!startDate || !endDate || !quote || !content) {
            alert("모든 내용을 입력했는지 확인해주세요.");
            return;
        }

        const requestBody = {
            bookId : bookData?.id,
            rating : selectedRating,
            quote,
            content,
            visibility : isPublic,
            startDate : startDate.toISOString().split("T")[0],
            endDate : endDate.toISOString().split("T")[0]
        };

        console.log(requestBody);

        try {
            await axios.post(`/api/logs/${userId}`, requestBody, 
            {
                headers : {Authorization : `Bearer ${accessToken}`},
                withCredentials : true,
            }
            
        )
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };
    
    return (
        <Main>
            <Container>
                <BookLogContainer>
                    <ImageContainer>
                        <Image src={bookData?.coverImage || Ad4} alt={bookData?.title || "책이미지"} />
                        <StarContainer>
                            <ContentRow jc="flex-start">
                                <Text size="23px" mr="15px">{bookData?.title || "책 제목"}</Text>
                                <Text size="19px">|</Text>
                                <Text ml="15px">{bookData?.author || "글쓴이"}</Text>
                            </ContentRow>
                            <ContentRow jc="flex-start">
                                <Text mr="60px">독서 기간</Text>
                                <CalendarWrapper>
                                    <StyledDatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        locale="ko"
                                    />
                                    <Text mb="45px">~</Text>
                                    <StyledDatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        locale="ko"
                                    />
                                </CalendarWrapper>
                            </ContentRow>
                            <ContentRow>
                                <StarContainer ml="0px">
                                    <Text>평점</Text>
                                    <Stars>
                                        {[...Array(maxStars)].map((_, index) => {
                                            const rating = (index + 1) / 2;
                                            return (
                                                <Star
                                                    key={index}
                                                    isFilled={rating <= selectedRating}
                                                    onClick={() => handleStarClick(rating)}
                                                >
                                                    ★
                                                </Star>
                                            );
                                        })}
                                    </Stars>
                                </StarContainer>
                                <StarContainer ml="0px">
                                    <Text>공개 / 비공개</Text>
                                    <ToggleButton
                                        isOn={isPublic}
                                        onClick={() => setIsPublic(!isPublic)}
                                    >
                                        {isPublic ? "공개" : "비공개"}
                                    </ToggleButton>
                                </StarContainer>
                            </ContentRow>
                            <Text>기록하고 싶은 글귀</Text>
                            <Input
                                value={quote}
                                onChange={handleInputChange}
                                height="120px"
                                width="calc(100%-70px)"
                            />
                        </StarContainer>
                    </ImageContainer>
                    <InputWrapper>
                        <Text ml="20px">Log</Text>
                        <Input
                            value={content}
                            onChange={(e)=>handleInputChange(e,"content")}
                            width="calc(100% - 90px)"
                        />
                        <CharCount>
                            ({charCount}/1000)
                        </CharCount>
                    </InputWrapper>
                    <FlexContainer>
                        <SubmitButton bgColor="#CCEBFF" onClick={handleSubmit}>저장</SubmitButton>
                    </FlexContainer>
                </BookLogContainer>
                <Footer />
            </Container>
        </Main>
    );
}

export default Writelog;
