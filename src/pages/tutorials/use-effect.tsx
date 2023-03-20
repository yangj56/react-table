import { useEffect, useState } from 'react';

export default function UseEffect() {
  const [resourceType, setResourceType] = useState('posts');
  const [items, setItems] = useState([]);

  console.log('this line will be printed everytime the component rerenders');
  useEffect(() => {
    console.log('this line will only be printed when resourceType changes');
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [resourceType]); // [] only render when onMount

  return (
    <>
      <div>
        <button onClick={() => setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>users</button>
        <button onClick={() => setResourceType('comments')}>comments</button>
      </div>
      <h1>{resourceType}</h1>
      {items.map((item, index) => {
        return <pre key={index}>{JSON.stringify(item)}</pre>;
      })}
    </>
  );
}
