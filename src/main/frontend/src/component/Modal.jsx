import React from "react";
import styled from "styled-components";

const ModalBack = styled.div`
    z-index : 1;
    position : fixed;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : ${(props) => props.backgroundColor || 'rgba(0,0,0,0.5)'};
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
`;

const ModalContent = styled.div`
    background : white;
    padding : 20px;
    text-align : center;
    width : 600px;
    height : 350px;
    border-radius : 10px;
    display : flex;
    justify-content : center;
    align-itmes : center;
    position : relative;
    flex-direction : column;
`;

const ExitBtn = styled.button`
    text-decoration : none;
    margin : 10px;
    border : none;
    background : none;
    width : 70px;
    height : 70px;
    font-size : 25px;
    position : absolute;
    top : 10px;
    right : 10px;
`;


function Modal({isOpen, closeModal, children, backgroundColor}) {
    if (!isOpen) return null;

    return (
        <ModalBack onClick={closeModal} backgroundColor={backgroundColor}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ExitBtn onClick={closeModal}>X</ExitBtn>
                {children}
            </ModalContent>
        </ModalBack>
    );

}
export default Modal;