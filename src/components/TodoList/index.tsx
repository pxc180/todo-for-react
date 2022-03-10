import React, { FC, ReactElement, useCallback, useState } from 'react';

import Input from './Input';
import List from './List';
import { ITodo } from './type';

const TodoList: FC = (): ReactElement => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const addTodo = useCallback((todo: ITodo): void => {
    console.log(todo);
    setTodoList(todoList => [...todoList, todo]);
  }, []);

  return (
    <div>
      <Input todoList={[]} addTodo={addTodo}></Input>
      <List></List>
    </div>
  );
};

export default TodoList;
