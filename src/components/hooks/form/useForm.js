import { useState } from 'react';

const useForm = (handleSubmit) => {

  const [item, setItem] = useState({});

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

  return [
    item,
    handleInputChange,
    handleFormSubmit
  ]
}

export default useForm;