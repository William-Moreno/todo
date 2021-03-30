import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TodoForm({ handleSubmit }) {

  let [item, setItem] = useState({});

 
  const handleInputChange = (e) => {
    setItem({...item, [e.target.name]: e.target.value } || { [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    handleSubmit(item);
    const newItem = {};
    setItem(newItem);
  };


    return (
      <>
        <Form onSubmit={handleFormSubmit} style={{ border: '1px solid #787878', width: '28vw', maxwidth: '400px', padding: '12px', margin: 'auto 18px auto -24px' }}>
        <h5>Add To Do Item</h5>
          <Form.Label>
            <span>To Do Item</span>
            <Form.Control
              name="text"
              placeholder="Item Details"
              onChange={handleInputChange}
            />
          </Form.Label>
          <Form.Label>
            <span>Due Date</span>
            <Form.Control
              name="due"
              placeholder="Due By"
              onChange={handleInputChange}
            />
          </Form.Label>
          <Form.Label>
            <span>Difficulty Rating</span>
            <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </Form.Label>
          <Form.Label>
            <span>Assigned To</span>
            <Form.Control type="text" name="assignee" placeholder="Assignee Name" onChange={handleInputChange} />
          </Form.Label>
          <Button style={{ width: '10vw', padding: '3px' }} type="submit">Add Item</Button>
        </Form>
      </>
    );

}

export default TodoForm;