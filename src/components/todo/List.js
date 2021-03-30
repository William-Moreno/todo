  
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function TodoList({ list, handleComplete }) {


    return (
      <ListGroup>
        {list.map(item => (
          <ListGroup.Item
            variant={item.complete === true ? "success" : "danger"}
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => handleComplete(item._id)}>
              {item.text}    ->  <span>{item.assignee}</span>
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );

}

export default TodoList;