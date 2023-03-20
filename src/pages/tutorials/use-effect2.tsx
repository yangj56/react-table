import { useEffect, useState } from 'react';

export default function UseEffect2() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  console.log('this line will be printed everytime the component rerenders');
  useEffect(() => {
    console.log('this line will only be printed when windowWidth changes');
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // [] only render when onMount

  return <div>{windowWidth}</div>;
}
