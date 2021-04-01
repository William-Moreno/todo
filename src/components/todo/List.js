import React, { useContext } from 'react';
import { SettingsContext } from '../../context/Settings.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import './list.scss';

function TodoList({ list, handleComplete, handleDelete }) {

  let context = useContext(SettingsContext);

    return (
      <>
      <ListGroup style={{ width: '110%', marginLeft: '30vw', marginTop: '36px' }}>
        {list.map(item => (
          <Card key={item._id} style={{ width: '24rem', marginBottom: '4px' }}>
            <Card.Body>
              <Card.Title style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid lightgrey', height: '2.5vh' }}>
                <span className={item.complete === true ? "complete progress-pill" : "pending progress-pill"} onClick={() => handleComplete(item._id)}>{item.complete === true ? "Complete" : "Pending"}</span>
                <span className="assigned-person">{item.assignee}</span>
                <button className="delete-button" size="sm" onClick={() => handleDelete(item._id)}>
                  X
                </button>
              </Card.Title>
              <Card.Text style={{ fontSize: '0.75rem' }}>
                {item.text}
              </Card.Text>
              <Card.Link href="#"></Card.Link>
              <Card.Text style={{ float: 'right', fontSize: '0.65rem' }}>Difficulty: {item.difficulty}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
      </>
    );

}

export default TodoList;