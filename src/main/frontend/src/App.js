import logo from './logo.svg';
import './App.css';
import "./index.css";
import Header from './header/Header';
import Login from './login/Login';
import Redirect from "./login/Redirect";
import AddInformation from './login/AddInformation';
import Home from './home/Home';
import Booklog from './booklog/Booklog';
import Mypage from './mypage/Mypage';
import Writelog from './booklog/Writelog';
import Bookdetail from './booklog/Bookdetail';
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/oauth/kakao/success" element={<Redirect />}></Route>
        <Route path="/addinformation" element={<AddInformation />}></Route>
        <Route path="/booklog" element={<Booklog />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/writelog" element={<Writelog />}></Route>
        <Route path="/bookdetail" element={<Bookdetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
