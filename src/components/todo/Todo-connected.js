import React, { useEffect } from 'react';
import useAxios from '../hooks/ajax/useAjax.js';
import Card from 'react-bootstrap/Card';
import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';


const ToDo = () => {



  let [list, addItem, toggleComplete, removeItem, getTodoItems] = useAxios();

  // eslint-disable-next-line
  useEffect(getTodoItems, []);

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`;
  }, [list]);


  return (
    <>
      <header>
        <h5 style={{ height: '6vh', padding: '1.5vh', background: '#0292FD', color: 'white' }}>Home</h5>
      </header>
      <Card style={{ width: '90vw', height: '80vh', boxShadow: '4px 4px 7px #222', margin: 'auto', padding: '8px', overflow: 'scroll', position: 'relative' }}>
        <Card.Header style={{ background: '#222', color: '#DDD', position: 'fixed', zIndex: '2', width: '84vw' }}>
          <h4>
          To Do List Manager ({list.filter(item => !item.complete).length})
          </h4>
        </Card.Header>

        <Card.Body className="todo">

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
        </Card.Body>
      </Card>
    </>
  );
};

export default ToDo;