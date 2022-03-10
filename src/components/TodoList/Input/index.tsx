import React, { FC, ReactElement, useRef } from 'react';
import { ITodo } from '../type';

import './index.less';

interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const Input: FC<IProps> = ({ addTodo, todoList }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = (): void => {
    const val: string = inputRef.current!.value.trim();

    if (val.length) {
      addTodo({ id: new Date().getTime(), content: val, completed: false });

      inputRef.current!.value = '';
    } else {
      alert('不能为空！');
    }
  };

  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入待办项" ref={inputRef} />
      <button onClick={addItem}>增加</button>
    </div>
  );
};

export default Input;
