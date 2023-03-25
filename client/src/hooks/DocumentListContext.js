import React, { useContext, useEffect, useState } from "react";

const DocumentListContext = React.createContext()
const DocumentListUpdateContext = React.createContext()

export function useDocumentList() {
	return useContext(DocumentListContext)
}

export function useDocumentListUpdate() {
	return useContext(DocumentListUpdateContext)
}

export function DocumentListProvider({ children }) {

  const [list, setList] = useState([])

  function updateDocumentList(newDocumentList) {
    setList(newDocumentList)
  }

  return (
    <DocumentListContext.Provider value={list}>
      <DocumentListUpdateContext.Provider value={updateDocumentList}>
        {children}
      </DocumentListUpdateContext.Provider>
    </DocumentListContext.Provider>
  )

}