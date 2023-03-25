import React from 'react'
import { Route, Routes } from "react-router-dom";
import { EditorPage } from "./pages/EditorPage";
import { MyDocuments } from "./pages/MyDocuments";
import { DocumentProvider } from "./hooks/DocumentContext";
import { ExplorerViewProvider } from './hooks/ExplorerViewContext';
import { DocumentListProvider } from './hooks/DocumentListContext';
import styles from './App.module.css';

function App() {

  return (
    <>
      <DocumentProvider>
      <ExplorerViewProvider>
      <DocumentListProvider>    
        <Routes>
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/" element={<MyDocuments />} />
        </Routes>
      </DocumentListProvider>    
      </ExplorerViewProvider>
      </DocumentProvider>
    </>
  );

}

export default App;
