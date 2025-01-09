import logo from './logo.svg';
import './App.css';
import Header from './header/Header';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/booklog" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
