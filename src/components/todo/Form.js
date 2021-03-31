import useForm from '../hooks/form/useForm.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function TodoForm({ handleSubmit }) {

  // eslint-disable-next-line
  let [item, handleInputChange, handleFormSubmit] = useForm(handleSubmit);


    return (
      <>
        <Form onSubmit={handleFormSubmit} style={{ border: '1px solid #787878', width: '28vw', maxwidth: '400px', padding: '12px', margin: '36px 18px auto -24px', position: 'fixed' }}>
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
            <span>Assigned To</span>
            <Form.Control type="text" name="assignee" placeholder="Assignee Name" onChange={handleInputChange} />
          </Form.Label>
          <Form.Label>
            <span>Difficulty Rating</span>
            <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </Form.Label>
          <Button style={{ width: '10vw', padding: '3px' }} type="submit">Add Item</Button>
        </Form>
      </>
    );

}

export default TodoForm;