import React from 'react';

type Item = {
  title: string;
  id: number;
};

type Props = {
  list: Item[];
};

const Todo = ({ list }: Props) => {
  console.log('Todo component rendered');
  return (
    <ul>
      {list.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </ul>
  );
};
export default React.memo(Todo);
