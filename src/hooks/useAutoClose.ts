import { useEffect, useRef, useState } from 'react';

const useAutoClose = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [bodyOverflow, setBodyOverflow] = useState('');
  const ref = useRef<HTMLDivElement>(null);


  // Handle Auth close when user click outside of the ref
  useEffect(() => {
    const closeMenu = (e: MouseEvent | Event) => {
      if (
        showPopup &&
        ref.current &&
        !ref.current.contains(e.target as Node)
        
      ) {
        setShowPopup(false);
      }
    };

 

   
    document.addEventListener('mousedown', closeMenu);
   

    return () => {
      // Remove event listeners when the component unmounts
      document.removeEventListener('mousedown', closeMenu);
    
    };
  }, [showPopup]);


  useEffect(() => {
    setBodyOverflow(showPopup ? 'hidden' : '');
  }, [showPopup]);

  // Set body overflow style when the component mounts
  useEffect(() => {
    document.body.style.overflow = bodyOverflow;

    // Cleanup function to reset body overflow when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [bodyOverflow]);

  

  const tooglepopup = (): void => {
    setShowPopup(!showPopup);
  };

  const closepopup = () => {
    setShowPopup(false);
  };


  return { showPopup, ref, tooglepopup, closepopup };
};

export default useAutoClose;
