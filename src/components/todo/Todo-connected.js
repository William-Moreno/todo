import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    item.complete = false;
    axios.post(todoAPI, item)
      .then(savedItem => {
        setList([...list, savedItem.data]);
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      axios.put(url, item)
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
        })
        .catch(console.error);
    }
  };

  const _removeItem = id => {

    console.log(id);

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      let url = `${todoAPI}/${id}`;

      axios.delete(url, item)
        .then(removedItem => {

    let temp = [...list];

    for( let i = temp.length - 1 ; i >= 0 ; i--) {
      if(removedItem.data._id === temp[i]._id) {
        temp.splice(i, 1);
        if(!temp.length) {
          setList([]);
          return;
        }
      }
    }
    setList(temp);

  })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    axios.get(todoAPI)
      .then(result => setList(result.data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

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
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete={_removeItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;