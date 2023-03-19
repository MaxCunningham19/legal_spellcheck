import React, { useContext, useEffect, useState } from "react";

const DocumentContext = React.createContext()
const DocumentUpdateContext = React.createContext()

export function useDocument() {
	return useContext(DocumentContext)
}

export function useDocumentUpdate() {
	return useContext(DocumentUpdateContext)
}

export function DocumentProvider({ children }) {

  const [document, setDocument] = useState({   
		title: "New document",
		blocks: [""],
		untracked: true
	})

  function updateDocument(newDocument) {
    setDocument(newDocument)
  }

  return (
    <DocumentContext.Provider value={document}>
      <DocumentUpdateContext.Provider value={updateDocument}>
        {children}
      </DocumentUpdateContext.Provider>
    </DocumentContext.Provider>
  )

}