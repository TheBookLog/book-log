import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    width : 400px;
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
    min-height: 40px;
    background-color: white;
    outline: none;
    box-sizing : border-box; //->height=content+padding+border
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
    width: 400px;
    background-color: #CCEBFF;
    border-radius: 10px;
    padding: 10px;
    height: 525px;
    box-sizing : border-box;
    flex-direction : column;
`;

const CategoryList = styled.ul`
    list-style : none;
    padding : 0;
`;

const CategoryItem = styled.li`
    padding : 8px;
    cursor : pointer;
    font-weight : ${({active}) => (active ? "bold" : "normal")};
    &:hover {
        background:#f0f0f0;
    };
`;

const Cardcontainer = styled.div`
    flex-direction : column;
    flex : 1;
    display : flex;
    justify-content : center;
    align-items : center;
    max-height : 550px;
`;

const Card = styled.div`
    width:100%;
    max-width : 950px;
    background-color: #EBF1F5;
    height: 100%;
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
    height : 100%;
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
    height: 150px;
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
    /*align-items: center;*/
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

const SuggenstionList = styled.ul`
    position : absolute;
    top : 40px;
    left : 0;
    width : 100%;
    background : white;
    border : 1px solid #ccc;
    border-radius : 8px;
    max-height : 200px;
    overflow-y : auto;
    z-index : 100;
    box-shadow : 0 2px 8px rgba(0,0,0,0.15);
    list-style : none;
    padding : 0;
    margin : 0;
`;

const SuggestionItem = styled.li`
    padding : 10px;
    cursor : pointer;
    &:hover {
        background:#f0f0f0;
    }
`;

function Booklog() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const booksPerPage = 12;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                console.log("카테고리 응답 확인: ", data);
                setCategories(data);
            } catch(error) {
                console.error(error);
            }
        };
        fetchCategories();
    },[]);

    useEffect(()=> {
        if (query.trim() === "") {
            setSuggestions([]);
            return;
        }
        const fetchSuggestions = async () => {
            try {
                const response = await fetch(`/api/books/search?query=${query}`);
                const data = await response.json();
                const books = data.books || data.item || [];

                if (books.length > 0) {
                    const filtererdSuggestions = books  
                        .filter(book => book.title && book.title.toLowerCase().includes(query.toLowerCase()))
                        .map(book => book.title);
                    setSuggestions([...new Set(filtererdSuggestions)]);
                }
                // if (data.books) {
                //     setSuggestions(data.books.map(book=>book.title));
                // } 
            } catch (error) {
                console.error("연관검색어 오류 : ",error);
            }
        };
        const delayDebounceFn = setTimeout(fetchSuggestions,300);
        return() => clearTimeout(delayDebounceFn);
    },[query]);

    const fetchBooks = async () => {
        try {
            let url = query 
                ? `/api/books/search?query=${query}`
                : selectedCategory
                    ? `/api/books/category/${selectedCategory}`
                    : "/api/books";
            const response = await fetch(url);
            const data = await response.json();

            let fetchedBooks = data.books || data.item || [];

            if (query) {
                const lowerQuery = query.toLowerCase();
                fetchedBooks = fetchedBooks.filter(book =>
                    book.title && book.title.toLowerCase().includes(lowerQuery)
                );
            }
            setBooks(fetchedBooks);
            setCurrentPage(1);
        } catch (error) {
            console.error("도서 검색 오류 : " ,error);
            setBooks([]);
        }
    };
    const handleSearch = () => {
        fetchBooks();
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setQuery(""); //카테고리 변경 시 검색어 초기화
        fetchBooks();
    };

    const handleSuggestionClick = async(selectedQuery) => {
        setQuery(selectedQuery);
        setSuggestions([]);

        try {
            const response = await fetch(`/api/books/search?query=${selectedQuery}`);
            const data = await response.json();
            const books = data.books || data.item || [];

            

            const exactMatch = books.find(book => book.title === selectedQuery);
            if (exactMatch) {
                setBooks([exactMatch]);
            } else {
                setBooks([]);
            }
            setCurrentPage(1);
        } catch (error) {
            console.error("도서 단일 검색 오류 : ",error);
            setBooks([]);
        }
        // handleSearch();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);

    const getPageNumbers = () => {
        return [...Array(totalPages).keys()].map(num => num+1);
    }

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
                            onFocus={()=> setSuggestionsVisible(true)}
                            onBlur={()=>setTimeout(()=> setSuggestionsVisible(false), 100)}
                        />
                        {suggestionsVisible && suggestions.length > 0 && (
                            <SuggenstionList>
                                {suggestions.map((suggestion, index) => (
                                    <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </SuggestionItem>
                                ))}
                            </SuggenstionList>
                        )}
                    </InputContainer>
                    <Category>
                        <h6>카테고리</h6>
                        <CategoryList>
                            <CategoryItem   
                                onClick={()=>handleCategoryClick(null)}
                                active={selectedCategory === null}>
                                    전체
                            </CategoryItem>
                            {categories.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    active={selectedCategory === category.id}
                                >
                                    {category.name}
                                </CategoryItem>
                            ))}
                            
                        </CategoryList>
                    </Category>
                </Container2>
                <Cardcontainer>
                    <Card>
                        <BookList>
                            {currentBooks.map((book) => (
                                <BookCard
                                    key={book.isbn}
                                    onClick={()=> {
                                        console.log("Clicked Book : ", book);
                                        navigate(`/bookdetail/${book.isbn}`);
                                    }}>
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
                    <PageButton 
                        key={number} 
                        active={number === currentPage}
                        onClick={() => setCurrentPage(number)}
                    >
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
