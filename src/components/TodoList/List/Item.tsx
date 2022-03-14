import React, { FC, ReactElement } from 'react';
import { ITodo } from '../type';

interface IProps {
  todo: ITodo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const ListItem: FC<IProps> = ({
  todo,
  toggleTodo,
  removeTodo
}): ReactElement => {
  const { completed, content, id } = todo;

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          toggleTodo(id);
        }}
      />
      <span>{content}</span>
      <button onClick={() => removeTodo(id)}>删除</button>
    </div>
  );
};

export default ListItem;
