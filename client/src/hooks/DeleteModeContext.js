import React, { useContext, useEffect, useState } from "react";

const DeleteModeContext = React.createContext()
const DeleteModeUpdateContext = React.createContext()

export function useDeleteMode() {
	return useContext(DeleteModeContext)
}

export function useDeleteModeUpdate() {
	return useContext(DeleteModeUpdateContext)
}

export function DeleteModeProvider({ children }) {

  const [deleteMode, setDeleteMode] = useState(false)

  function updateDeleteMode() {
    setDeleteMode((prevMode) => !prevMode)
  }

  return (
    <DeleteModeContext.Provider value={deleteMode}>
      <DeleteModeUpdateContext.Provider value={updateDeleteMode}>
        {children}
      </DeleteModeUpdateContext.Provider>
    </DeleteModeContext.Provider>
  )

}