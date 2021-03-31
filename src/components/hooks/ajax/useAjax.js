import { useState } from 'react';
import axios from 'axios';


const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const useAxios = () => {

  let [list, setList] = useState([]);

  const addItem = (item) => {
    item.due = new Date();
    // item.complete = false;
    axios.post(todoAPI, item)
      .then(savedItem => {
        setList([...list, savedItem.data]);
      })
      .catch(console.error);
  };

  const toggleComplete = id => {

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

  const removeItem = id => {

    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {

      let url = `${todoAPI}/${id}`;

      axios.delete(url, item)
        .then(removedItem => {

    let temp = [...list];

    for( let i = temp.length - 1 ; i >= 0 ; i--) {
      if(removedItem.data._id === temp[i]._id) {
        temp.splice(i, 1);
      }
    }
    setList(temp);

  })
        .catch(console.error);
    }
  };

  const getTodoItems = () => {
    axios.get(todoAPI)
      .then(result => setList(result.data.results))
      .catch(console.error);
  };


  return [
    list,
    addItem,
    toggleComplete,
    removeItem,
    getTodoItems
  ]

}

export default useAxios;