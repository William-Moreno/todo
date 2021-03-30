import React, { useEffect } from 'react';
import useAxios from '../hooks/ajax/useAjax.js';
import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';


const ToDo = () => {

  let [list, addItem, toggleComplete, removeItem, getTodoItems] = useAxios()


  useEffect(getTodoItems, []);

    useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`;
  }, [list]);

  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={removeItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;