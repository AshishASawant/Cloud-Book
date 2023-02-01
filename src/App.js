import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Notestate from './components/context/Notestate'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup  from './components/Signup';
import Home from './components/Home'
function App() {
  return (
      <Notestate>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />}/>
      <Route exact path='/home' element={<Home/>} />
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
      </Notestate>
  );
}

export default App;
