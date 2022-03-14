import React, { FC, ReactElement } from 'react';
import ListItem from './Item';

import './index.less';
import { ITodo } from '../type';

interface IProps {
  todoList: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const List: FC<IProps> = ({
  todoList,
  removeTodo,
  toggleTodo
}): ReactElement => {
  return (
    <div>
      {todoList.map((v: ITodo) => (
        <ListItem
          key={v.id}
          todo={v}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
};

export default List;
