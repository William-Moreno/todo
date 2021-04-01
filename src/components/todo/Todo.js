import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import useAjax from '../hooks/ajax/useAjaxV2.js';
import axios from 'axios';

import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';

let todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

function ToDo() {

  const [url, setUrl] = useState('https://api-js401.herokuapp.com/api/v1/todo');
  const [method, setMethod] = useState('get');
  const [list, setList] = useState([]);
  const [request, response] = useAjax();


  const addItem = (item) => {
    setMethod('post');
    item.due = new Date();
    let options = {
      url: url,
      method: method,
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      item: item,
    };

    request(options);

    console.log(response);

  };

  const toggleComplete = id => {

    // let item = list.filter(i => i._id === id)[0] || {};

    // if (item._id) {

    //   item.complete = !item.complete;

    //   let url = `${todoAPI}/${id}`;

    //   axios.put(url, item)
    //     .then(savedItem => {
    //       setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
    //     })
    //     .catch(console.error);
    // }
  };

  const removeItem = id => {

  //   let item = list.filter(i => i._id === id)[0] || {};
  //   if (item._id) {

  //     let url = `${todoAPI}/${id}`;

  //     axios.delete(url, item)
  //       .then(removedItem => {

  //   let temp = [...list];

  //   for( let i = temp.length - 1 ; i >= 0 ; i--) {
  //     if(removedItem.data._id === temp[i]._id) {
  //       temp.splice(i, 1);
  //     }
  //   }
  //   setList(temp);

  // })
  //       .catch(console.error);
  //   }
  };

  const getTodoItems = () => {
    axios.get(todoAPI)
      .then(result => setList(result.data.results))
      .catch(console.error);
  };

  useEffect(() => {
    request({ url: url, method: 'get' });
  }, [request]);

  useEffect(() => {
    setList(response);
  }, [response]);

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`;
  }, [list]);


    return (
      <div>
      <header>
        <h5 style={{ height: '6vh', padding: '1.5vh', background: '#0292FD', color: 'white' }}>Home</h5>
      </header>
      <Card style={{ width: '90vw', height: '80vh', boxshadow: '4px 4px 7px #222', margin: 'auto', padding: '8px' }}>
        <Card.Header style={{ background: '#222', color: '#DDD' }}>
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
              </div>
    );

}

export default ToDo;