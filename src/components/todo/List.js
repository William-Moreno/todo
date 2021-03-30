  
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function TodoList({ list, handleComplete, handleDelete }) {


    return (
      <ListGroup style={{ width: '110%' }}>
        {list.map(item => (
          <ListGroup.Item
            variant={item.complete === true ? "success" : "danger"}
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => handleComplete(item._id)}>
              <span>Due {item.due} : </span>  
               {item.text}    ->  <span>{item.assignee}</span>
            </span> 
           <Button style={{ float: 'right', padding: '2px' }} variant="danger" size="sm" onClick={() => handleDelete(item)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );

}

export default TodoList;