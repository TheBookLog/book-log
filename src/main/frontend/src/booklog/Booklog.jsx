import React, { useState } from "react";
import styled from "styled-components";
import search from './search.png';

const Container = styled.div`
    display: flex;
    flex-direction: column; /* ✅ Pagination을 Card 아래에 배치 */
    align-items: center;
    margin: 0 50px;
    padding-top: 70px;
    position: relative;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const InputContainer = styled.div`
    position: relative;
    width: 400px;
`;

const Input = styled.input`
    padding: 8px 10px;
    padding-left: 40px;
    font-size: 15px;
    border: 2px solid #CCEBFF;
    border-radius: 8px;
    width: 100%;
    height: 20px;
    background-color: white;
    outline: none;
`;

const SearchIcon = styled.img`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const Category = styled.div`
    width: 100%;
    background-color: #CCEBFF;
    border-radius: 10px;
    padding: 10px;
    height: 525px;
`;

const Cardcontainer = styled.div`
    flex-direction : column;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const Card = styled.div`
    width: 950px;
    background-color: #EBF1F5;
    height: 550px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 15px;
    padding: 20px;
`;

const BookCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const BookImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const BookTitle = styled.h4`
    font-size: 14px;
    margin: 10px 0 5px;
`;

const BookAuthor = styled.p`
    font-size: 12px;
    color: gray;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px; /* ✅ Card 아래에 위치 */
`;

const PageButton = styled.button`
    background-color: ${(props) => (props.active ? "#007bff" : "#fff")};
    color: ${(props) => (props.active ? "#fff" : "#000")};
    border: 1px solid #ccc;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
`;

function Booklog() {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const handleSearch = async () => {
        if (!query.trim()) return;

        const KEY = process.env.BOOK_API_KEY;
        const API_URL = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${KEY}&Query=${query}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.item) {
                setBooks(data.item);
            } else {
                setBooks([]);
            }
        } catch (error) {
            console.error("도서 검색 실패 : ", error);
            setBooks([]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(books.length / booksPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <Container>
            <ContentWrapper>
                <Container2>
                    <InputContainer>
                        <SearchIcon src={search} onClick={handleSearch} />
                        <Input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </InputContainer>
                    <Category>
                        <h6>전체</h6>
                    </Category>
                </Container2>
                <Cardcontainer>
                    <Card>
                        <BookList>
                            {currentBooks.map((book) => (
                                <BookCard key={book.isbn}>
                                <BookImage src={book.cover} alt={book.title} />
                                <BookTitle>{book.title}</BookTitle>
                                <BookAuthor>{book.author}</BookAuthor>
                            </BookCard>
                            ))}
                        </BookList>
                    </Card>
            
            {/* ✅ Pagination이 Card 아래에 위치하도록 수정 */}
            <Pagination>
                <PageButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>◀</PageButton>
                {getPageNumbers().map((number) => (
                    <PageButton key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                        {number}
                    </PageButton>
                ))}
                <PageButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>▶</PageButton>
            </Pagination>
                </Cardcontainer>
                </ContentWrapper>
        </Container>
    );
}

export default Booklog;
