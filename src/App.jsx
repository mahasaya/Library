import { useState } from 'react'
import './App.css'
import ScreenOne from "./Screens/ScreenOne"
import Library from "./Screens/Library"
import {  Routes, Route } from "react-router-dom";

function App() { 

  return (


      <Routes>
        <Route path="/" element={<ScreenOne/>}/>
        <Route path="library" element={<Library />} />
      </Routes>

  )
}

export default App
