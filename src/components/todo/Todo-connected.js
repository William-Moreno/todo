import React, { useState, useEffect } from 'react';
import SettingsProvider from '../../context/Settings.js';
import AuthProvider from '../../context/AuthProvider.js';
import Login from '../auth/Login.js';
import Auth from '../auth/Auth.js';
import useAjax from '../hooks/ajax/useAjax.js';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {


  const [request, response] = useAjax();
  const [list, setList] = useState([]);


  // eslint-disable-next-line
  useEffect(() => {
    if(response.results){
      response.results && setList(response.results);
    } else {
      getItems();
    }
    // eslint-disable-next-line
  }, [response]);

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`;
  }, [list]);

  useEffect(() => {
    request({ url: todoAPI, method: 'get' });
  }, [request]);

  const addItem = (item) => {
    item.due = new Date();

    let options = {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      data: item,
    };
    request(options);
  };

  const toggleComplete = id => {
    const item = list.filter(i => i._id === id)[0] || {};

    if(item._id) {

      item.complete = !item.complete;

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

  const deleteItem = id => {
    const url = `${todoAPI}/${id}`;
    const options = {
      url: url,
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  const getItems = () => {
    const options = {
      url: todoAPI,
      method: 'get',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <AuthProvider>
        <header>
          <Navbar style={{ color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} bg='primary' variant='dark' className='headerOne'>
            <h4>Home</h4>
            <div>
              <Login />
            </div>
          </Navbar>
        </header>
        <Auth capability="read">
      <Card style={{ width: '90vw', height: '80vh', boxShadow: '4px 4px 7px #222', margin: 'auto', padding: '8px', position: 'relative' }}>
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
          <SettingsProvider>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              handleDelete={deleteItem}              
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