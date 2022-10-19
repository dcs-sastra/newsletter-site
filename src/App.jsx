import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import Newsletter from './pages/Newsletter'


function App() {

  return (
    <>
    <img src="/bg.png" id="bg" alt=""></img>
    <Routes>
      <Route path="/" element={<Home />} exact></Route>
      <Route path="/view/:month/:year" element={<Newsletter />} exact></Route>
    </Routes>
    </>
  )
}

export default App
