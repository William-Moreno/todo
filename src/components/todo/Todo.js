import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import TodoForm from './Form.js';
import TodoList from './List.js';

import './todo.scss';

function ToDo() {

  let [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let changeList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(changeList);
    }

  };

  const removeItem = (item) => {

    let temp = [...list];
    if(temp.length < 2){
      return;
    }


    for( let i = temp.length - 1 ; i >= 0 ; i--) {
      if(item._id === temp[i]._id) {
        temp.splice(i, 1);
        if(!temp.length) {
          setList([]);
          return;
        }
      }
    }
    setList(temp);

  };
  

  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];

    setList(list);
  }, []);

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