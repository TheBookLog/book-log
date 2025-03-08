import logo from './logo.svg';
import './App.css';
import "./index.css";
import Header from './header/Header';
import Login from './login/Login';
import Redirect from "./login/Redirect";
import AddInformation from './login/AddInformation';
import Home from './home/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/redirect" element={<Redirect />}></Route>
        <Route path="/addinformation" element={<AddInformation />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
