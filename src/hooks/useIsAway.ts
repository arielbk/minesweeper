import { useEffect, useState } from 'react';

const useIsAway = (): boolean => {
  const [isAway, setIsAway] = useState(false);

  useEffect(() => {
    const setIsAwayFromDocument = () => setIsAway(document.hidden);
    document.addEventListener('visibilitychange', setIsAwayFromDocument);
    return () =>
      document.removeEventListener('visibilitychange', setIsAwayFromDocument);
  }, []);

  return isAway;
};

export default useIsAway;
