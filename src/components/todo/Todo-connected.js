import React, { useEffect } from 'react';
import SettingsProvider from '../../context/Settings.js';
import useAxios from '../hooks/ajax/useAjax.js';
import Card from 'react-bootstrap/Card';
import Preferences from '../preferences/Preferences.js';
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
          <div>
            <TodoForm handleSubmit={addItem} />
          </div>
          <SettingsProvider>
          <div>
            <Preferences list={list} />
          </div>
          </SettingsProvider>
          </div>
          <div>
          <SettingsProvider>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              handleDelete={removeItem}
              
              />
          </SettingsProvider>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ToDo;