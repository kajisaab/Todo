import { useRef, useEffect } from 'react';

const useOutSideClick = (callback: any) => {
  const ref = useRef<null | HTMLParagraphElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);

  return ref;
};

export default useOutSideClick;
