import { useEffect, useRef, useState } from 'react';

export default function UseRef() {
  const [name, setName] = useState('');
  const renderCount = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
      <span>
        My name is: {name} and render count {renderCount.current}
      </span>
    </div>
  );
}
