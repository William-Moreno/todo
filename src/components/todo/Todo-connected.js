import React, { useState, useEffect } from 'react';
import SettingsProvider from '../../context/Settings.js';
import AuthProvider from '../../context/AuthProvider.js';
import Login from '../auth/Login.js';
import Auth from '../auth/Auth.js';
import useAjax from '../hooks/ajax/useAjax.js';
import Card from 'react-bootstrap/Card';
import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {


  const [request, response] = useAjax();
  const [list, setList] = useState([]);


  // eslint-disable-next-line
  useEffect(() => {
    response.results && setList(response.results);
  }, [response]);

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`;
  }, [list]);

  const _addItem = (item) => {
    let options = {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      data: item,
    };
    request(options);
  };

  const _toggleComplete = id => {
    const item = list.filter(i => i._id === id)[0] || {};

    if(item._id) {
      const url = `${todoAPI}/${id}`;
      const options = {
        url: url,
        method: 'put',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        data: { complete: !item.complete},
      };
      request(options);
    }
  };

  const _deleteItem = id => {
    const url = `${todoAPI}/${id}`;
    const options = {
      url: url,
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  const _getItems = () => {
    const options = {
      url: todoAPI,
      method: 'get',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  useEffect(() => {
    _getItems();
  }, []);


  return (
    <>
      <AuthProvider>
      <header>
        <h5 style={{ height: '6vh', padding: '1.5vh', background: '#0292FD', color: 'white' }}>Home</h5>
      </header>
        <Login />
        <Auth capability="read">
      <Card style={{ width: '90vw', height: '80vh', boxShadow: '4px 4px 7px #222', margin: 'auto', padding: '8px', overflow: 'scroll', position: 'relative' }}>
        <Card.Header style={{ background: '#222', color: '#DDD', position: 'fixed', zIndex: '2', width: '84vw' }}>
          <h4>
          To Do List Manager ({list.filter(item => !item.complete).length})
          </h4>
        </Card.Header>
        <Card.Body className="todo">
          <div>
            <TodoForm handleSubmit={_addItem} />
          </div>
          <div>
          <SettingsProvider>
            <TodoList
              list={list}
              handleComplete={_toggleComplete}
              handleDelete={_deleteItem}              
              />
          </SettingsProvider>
          </div>
        </Card.Body>
      </Card>
        </Auth>
      </AuthProvider>
    </>
  );
};

export default ToDo;