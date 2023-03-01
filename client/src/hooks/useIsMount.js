import { useRef, useEffect } from 'react';

export const useDidMount = () => {
  const didMountRef = useRef(false);
  useEffect(() => {
    didMountRef.current = true;
  }, []);
  return didMountRef.current;
};