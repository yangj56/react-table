import { useState } from 'react';

export default function UseState() {
  const [count, setCount] = useState(0);
  // const [objectState, setObjectState] = useState({ count: 4, theme: 'blue' });
  // const [count, setCount] = useState(() => sampleFn()); // this will trigger console.log once during first render
  // const [count, setCount] = useState(sampleFn()); // this will trigger console.log everytime the component rerenders

  function decrementCount() {
    setCount((count) => count - 1);
    // when updating objectState, we cannot update partial object
    // setObjectState((obj) => {
    //   return { ...obj, count: 1 };
    // });
  }

  function increaseCount() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={increaseCount}>+</button>
    </>
  );
}

// const sampleFn = () => {
//   console.log('running function');
//   return 0;
// };
