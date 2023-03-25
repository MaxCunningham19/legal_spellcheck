import React, { useContext, useEffect, useState } from "react";

const ExplorerViewContext = React.createContext()
const ExplorerViewUpdateContext = React.createContext()

export function useExplorerView() {
	return useContext(ExplorerViewContext)
}

export function useExplorerViewUpdate() {
	return useContext(ExplorerViewUpdateContext)
}

export function ExplorerViewProvider({ children }) {

  const [iconView, setIconView] = useState(true)

  function updateIconView() {
    setIconView((iconView) => !iconView)
  }

  return (
    <ExplorerViewContext.Provider value={iconView}>
      <ExplorerViewUpdateContext.Provider value={updateIconView}>
        {children}
      </ExplorerViewUpdateContext.Provider>
    </ExplorerViewContext.Provider>
  )

}