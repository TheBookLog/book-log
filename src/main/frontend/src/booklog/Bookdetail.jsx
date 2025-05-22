import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, SubmitButton } from "../component/Button";

const Container = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;
    max-width : 1470px;
    padding-top : 70px;
    align-items : center;
    justify-content : center;
    padding-left : 30px;
    padding-right : 30px;
    margin-right : 0 auto;
`;

const DetailWrapper = styled.div`
    display : flex;
    justify-content : center;
    width : 100%;
`;

const Detail = styled.div`
    background-color : #EBF1F5;
    border-radius : 10px;
    width : 100%;
    align-items : center;
    justify-content : center;
    
    padding : 20px;
`;

const Text = styled.h6`
    font-size: ${(props) => props.size || "17px"};
    margin-top: ${(props) => props.mt || "0"};
    margin-left: ${(props) => props.ml || "0"};
    margin-right: ${(props) => props.mr || "0"};
    margin-bottom: ${(props) => props.mb || "10px"};
`;

const Cardcontainer = styled.div`
    display : flex;
    flex-direction : row;
    gap : 100px;
`;

const Bookcontainer = styled.div`
    display : flex;
    flex-direction : column;
    gap : 50px;
    padding-top : 100px;
`;

const InfoRow = styled.div`
    display : flex;
    justify-content : space-between;
    width : 100%;
    max-width : 500px;
`;

const Label = styled.span`
    font-size : 15px;
    min-width : 100px;
`;

const Value = styled.span`
    font-size : 15px;
    text-align : right;
    flex-grow : 1;
`;

const Image = styled.img`
    width : 150px;
    height : 240px;
    margin-top : 30px;
    margin-left : 30px;
    margin-bottom : 30px;
`;

const Logcontainer = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    margin-top : 10px;
`;

const LogsWrapper = styled.div`
    display : grid;
    grid-template-columns : repeat(3, 1fr);
    gap : 20px;
    margin-top : 20px;
`;

const LogCard = styled.div`
    position : relative;
    width : 150px;
    height : 200px;
    overflow : hidden;
    cursor : pointer;
    &:hover .quote {
        opacity : 1;
    }
`;

const LogImage = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
`;

const QuoteOverlay = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background : rgba(0,0,0,0.6);
    color : black;
    display : flex;
    align-items : center;
    justify-content : center;
    padding : 10px;
    opacity : 0;
    transition : opacity 0.3s ease;
    font-size : 13px;
    text-align : center;
`;

const LogAuthor = styled.div`
    text-align : center;
    margin-top : 5px;
    font-size : 14px;
`;

function Bookdetail() {
    const navigate = useNavigate();
    // const { isbn } = useParams();
    const { id } = useParams();  

    const navigateToWritelog = () => {
        navigate(`/writelog/${id}`);
    }

    const [bookData, setBookData] = useState(null);
    const [error, setError] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // console.log("id값 : ",id);
        // console.log("isbn값 : ",isbn);
        const fetchBookData = async () => {
            try {
                const { data } = await axios.get(`/api/books/${id}`);
                console.log("책데이터 : ", data);
                setBookData(data); //setBookData(data)가 실행되면서 bookData 상태 값이 위의 객체로 설정됨.
            } catch (error) {
                console.error("책 정보 가져오기 실패 :",error);
                setError("책 정보를 불러오는 데 실패했습니다.");
            }
        };

        const fetchBookLogs = async () => {
            try {
                const { data } = await axios.get(`/api/logs/book/${id}`);
                console.log(data);
                setLogs(data);
            } catch (error) {
                console.error("Log 가져오기 실패:",error);
            }
        }
        if (id) {
            fetchBookData();
            fetchBookLogs();
        }
    },[id]);

    const totalLogs = logs.length;
    const averageRating = bookData?.averageRating
        ? `${bookData.averageRating.toFixed(1)} / 5.0 (${totalLogs}개)`
        : "N/A";

    return (
        <Container>
            <DetailWrapper>
                <Detail>
                    <Cardcontainer>
                        <Image src={bookData?.cover} alt={bookData?.title}/> 
                        <Bookcontainer>
                            <InfoRow>
                                <Label>저자 정보</Label>
                                <Value>{bookData?.author}</Value>
                            </InfoRow>
                            <InfoRow>
                                <Label>출판사</Label>
                                <Value>{bookData?.publisher}</Value>
                            </InfoRow>
                            <InfoRow>
                                <Label>장르</Label>
                                <Value>{bookData?.category}</Value>
                            </InfoRow>
                            
                        </Bookcontainer>
                    </Cardcontainer>
                </Detail>
            </DetailWrapper>
            <Logcontainer>
                <Text size="15px">Log ⭐ {averageRating}</Text>
                <SubmitButton bgColor="#CCEBFF" onClick={navigateToWritelog}>Log 작성</SubmitButton>
            </Logcontainer>
            <LogsWrapper>
                {logs.map((log) => (
                    <LogCard key={log.id}>
                        <LogImage src={log.coverImage} alt="log cover" />
                        <QuoteOverlay className="quote">{log.quote}</QuoteOverlay>
                        <LogAuthor>{log.username}님의 Log</LogAuthor>
                    </LogCard>
                ))}
            </LogsWrapper> 
        </Container>
    );

}
export default Bookdetail;