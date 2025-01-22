import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: 9px 13px;
    font-size: 15px;
    border: ${(props) => (props.active ? "3px solid #5AA2D3" : "2px solid transparent")};
    border-radius: 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "#CCEBFF" : "#EBF1F5")};
    transition: border 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #ddd;
    }
`;

const StyledSubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 15px;
    border: none;
    background-color: ${(props) => props.bgColor || "#25a745"};
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

export const Button = ({ active, children, onClick }) => {
    return (
        <StyledButton active={active} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export const SubmitButton = ({ bgColor, children, onClick }) => {
    return (
        <StyledSubmitButton bgColor={bgColor} onClick={onClick}>
            {children}
        </StyledSubmitButton>
    );
};
