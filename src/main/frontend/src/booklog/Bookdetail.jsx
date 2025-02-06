import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, SubmitButton } from "../component/Button";

const Container = styled.div`
    display : flex;
    flex-direction : column;
    width : 80%;
    padding-top : 70px;
    align-itmes : center;
    justify-content : center;
    margin-left : 20px;
    margin-right : 20px;
`;

const Detail = styled.div`
    background-color : #EBF1F5;
    border-radius : 10px;
    
    width : 100%;
    align-itmes : center;
    justify-content : center;
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
    gap : 20px;
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


function Bookdetail() {
    const navigate = useNavigate();

    const navigateToWritelog = () => {
        navigate("/writelog");
    }
    return (
        <Container>
            <Detail>
                <Cardcontainer>
                    <Image />
                    <Bookcontainer>
                        <Text size="20px" mt="30px">빛이 이끄는 곳으로</Text>
                        <Text size="13px">저자 정보</Text>
                        <Text size="13px">출판사</Text>
                        <Text size="13px">장르</Text>
                    </Bookcontainer>
                </Cardcontainer>
            </Detail>
            <Logcontainer>
                <Text size="15px">Log</Text>
                <SubmitButton bgColor="#CCEBFF" onClick={navigateToWritelog}>Log 작성</SubmitButton>
            </Logcontainer>
            
        </Container>
    )

}
export default Bookdetail;