import { useEffect, useState } from 'react';

const useS24Ultra = () => {
  const [isS24Ultra, setIsS24Ultra] = useState(false);

  useEffect(() => {
    const checkS24Ultra = () => {
      // Detect Samsung S24 Ultra using screen width between 320px and 480px
      // and device pixel ratio of at least 3.5
      const isS24 = window.screen.width >= 320 && 
                   window.screen.width <= 480 && 
                   window.devicePixelRatio >= 3.5;
      setIsS24Ultra(isS24);
    };

    checkS24Ultra();
    
    // Re-check on resize
    window.addEventListener('resize', checkS24Ultra);
    
    return () => {
      window.removeEventListener('resize', checkS24Ultra);
    };
  }, []);

  return isS24Ultra;
};

export default useS24Ultra;