import React from 'react'
import { Route, Routes } from "react-router-dom";
import { EditorPage } from "./pages/EditorPage";
import { MyDocuments } from "./pages/MyDocuments";
import styles from './App.module.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/" element={<MyDocuments />} />
      </Routes>
    </>
  );

}

export default App;
