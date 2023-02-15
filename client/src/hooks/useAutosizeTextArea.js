import { useState, useEffect } from "react";

const useAutosizeTextArea = (
  textAreaRef,
  value
) => {

  const [onMount, setOnMount] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setOnMount(true);
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  useEffect(() => {
    if (textAreaRef || onMount) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value, onMount, windowWidth]);
};

export default useAutosizeTextArea;