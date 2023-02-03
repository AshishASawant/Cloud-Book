import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notestate from "./components/context/Notestate";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useState } from "react";
import Loadingbar from "./components/Loadingbar";
function App() {
  const [progress, setProgress] = useState(0);
  return (
    <Notestate setProgress={setProgress}>
      <Loadingbar progress={progress} setProgress={setProgress}/>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<Home  progress={progress} setProgress={setProgress} />} />
          <Route exact path="/login" element={<Login  progress={progress} setProgress={setProgress} />} />
          <Route exact path="/signup" element={<Signup  progress={progress} setProgress={setProgress} />} />
        </Routes>
      </BrowserRouter>
    </Notestate>
  );
}

export default App;
