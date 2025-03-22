import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Group130 from "./Group130.png";
import Group131 from "./Group131.png";
import Group132 from "./Group132.png";
import Ad1 from "./Ad1.PNG";
import Ad2 from "./Ad2.PNG";
import Ad3 from "./Ad3.jpg";
import Ad4 from "./Ad4.jpg";

const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 30px 190px;
`;

const AdSliderContainer = styled.div`
    width: 350px;
    height: 250px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    &:hover .arrow {
        display: flex;
    }
`;

const StyledSlider = styled(Slider)`
    width: 100%;
    height: 100%;
    .slick-slide div {
        cursor: pointer;
    }
    .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;
    }
`;

const ContentSliderContainer = styled.div`
    width: 80%;
    height: 270px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 15px;
    border: 10px solid #EBF1F5;
    background-color: white;
    z-index: 3;
    position: relative;
`;

const ContentSlider = styled(Slider)`
    .slick-slide div {
        cursor: pointer;
        padding: 0 15px;
    }
    .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;
    }
`;

const Pre = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: none;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
`;

const NextTo = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: none;
    justify-content: center;
    align-items: center;
    color : white;
    cursor: pointer;
`;

const Text = styled.div`
    font-size: ${({ size }) => size || "35px"};
    font-weight: bold;
    color: #333;
    margin-right: ${({ mr }) => mr || "20px"};
    margin-top: ${({ mt }) => mt || "10px"};
    margin-left: ${({ ml }) => ml || ""};
    margin-bottom: ${({ mb }) => mb || "20px"};
`;

const Text2 = styled.div`
    flex-direction: column;
`;

const AdImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    border-radius: 20px;
`;

const ContentImage = styled.img`
    width: 130px;
    height: 180px;
    object-fit: cover;
    margin: 0 auto;
    margin-top: 10px;
`;

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

const Content = styled.div`
    flex: 1;
    height: 100%;
    margin-top: 7px; /* AdSliderContainer와 ContentSliderContainer 사이 간격 감소 */
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 70px;
    position: relative;
`;

const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 2500,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <Pre className="arrow">{"<"}</Pre>,
    nextArrow: <NextTo className="arrow">{">"}</NextTo>,
};

const contentSliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
};

function Home() {
    return (
        <Container>
            <Main>
                <Text2>
                    <Text mb="30px">나만의 작은 책장 <br /> BookLog</Text>
                    <Text size="18px">BookLog와 함께 책읽는 습관 만들기 <br /> # 나의 독서기록 # 똑똑한 독서습관</Text>
                </Text2>
                
                <AdSliderContainer>
                    <StyledSlider {...sliderSettings}>
                        <div>
                            <AdImage src={Group130} alt="Group130" />
                        </div>
                        <div>
                            <AdImage src={Group131} alt="Group131" />
                        </div>
                        <div>
                            <AdImage src={Group132} alt="Group132" />
                        </div>
                    </StyledSlider>
                </AdSliderContainer>
            </Main>
            <Content>
                <ContentSliderContainer>
                    <Text ml="50px" size="18px" mt="15px">최근에 등록된 Log를 확인해 보세요!</Text>
                    <ContentSlider {...contentSliderSettings}>
                        <div>
                            <ContentImage src={Ad1} alt="Ad1" />
                        </div>
                        <div>
                            <ContentImage src={Ad2} alt="Ad2" />
                        </div>
                        <div>
                            <ContentImage src={Ad3} alt="Ad3" />
                        </div>
                        <div>
                            <ContentImage src={Ad4} alt="Ad4" />
                        </div>
                    </ContentSlider>
                </ContentSliderContainer>
            </Content>
            <Footer />
        </Container>
    );
}

export default Home;
