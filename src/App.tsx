import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainMenu } from "./Components/Pages/MainMenu";
import { Consumption } from "./Components/Pages/Consumption";
import { EngineOil } from "./Components/Pages/EngineOil";
import { SignIn } from "./Components/Pages/SignIn";
import { SignUp } from "./Components/Pages/SignUp";
import { StartUp } from "./Components/Pages/StartUp";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/Consumption" element={<Consumption />} />
        <Route path="/EngineOil" element={<EngineOil />} />
        <Route path="/StartUp" element={<StartUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
