import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Browse } from "./pages/Browse";
import { MyDocuments } from "./pages/MyDocuments";
import styles from './App.module.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/my-documents" element={<MyDocuments />} />
      </Routes>
    </>
  );

}

export default App;
