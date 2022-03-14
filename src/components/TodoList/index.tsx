import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react';

import Input from './Input';
import List from './List';
import { ITodo, IState, ACTION_TYPE, IAction } from './type';

function init(initTodoList: ITodo[]): IState {
  console.log(initTodoList);

  return {
    todoList: initTodoList
  };
}

const todoReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.INIT_TODO:
      return {
        ...state,
        todoList: payload as ITodo[]
      };
    case ACTION_TYPE.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, payload as ITodo]
      };
    case ACTION_TYPE.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(v => v.id !== payload)
      };
    case ACTION_TYPE.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(v => {
          return v.id === payload ? { ...v, completed: !v.completed } : v;
        })
      };
    default:
      return state;
  }
};

const TodoList: FC = (): ReactElement => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const [state, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');

    dispatch({ type: ACTION_TYPE.INIT_TODO, payload: todoList });
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(state.todoList));
  }, [state.todoList]);

  const addTodo = useCallback((todo: ITodo): void => {
    dispatch({ type: ACTION_TYPE.ADD_TODO, payload: todo });
  }, []);

  const removeTodo = useCallback((id: number): void => {
    dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
  }, []);

  const toggleTodo = useCallback((id: number): void => {
    dispatch({ type: ACTION_TYPE.TOGGLE_TODO, payload: id });
  }, []);

  return (
    <div>
      <Input todoList={[]} addTodo={addTodo}></Input>
      <List
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      ></List>
    </div>
  );
};

export default TodoList;
