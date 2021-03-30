import { useState, useEffect } from 'react';

function TodoForm({ handleSubmit }) {

  let [item, setItem] = useState({});

 
  const handleInputChange = (e) => {
    setItem({...item, [e.target.name]: e.target.value });
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
        <h3>Add Item</h3>
        <form onSubmit={handleFormSubmit}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </label>
          <button>Add Item</button>
        </form>
      </>
    );

}

export default TodoForm;