import { useState } from 'react';

const useForm = (callback) => {

  const [item, setItem] = useState({});

    const handleInputChange = (e) => {
    setItem({...item, [e.target.name]: e.target.value } || { [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    callback(item);
    // const newItem = {};
    // setItem(newItem);
  };

  return [
    item,
    handleInputChange,
    handleFormSubmit
  ]
}

export default useForm;