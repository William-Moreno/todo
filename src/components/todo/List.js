import React, { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../context/Settings.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

import './list.scss';

function TodoList({ list, handleComplete, handleDelete }) {

  // console.log(list);

  let [page, setPage] = useState(1);
  let [movingList, setMovingList] = useState(list);

  console.log(movingList);

  let context = useContext(SettingsContext);

  console.log(context);
  
  const handleShowComplete = (e, settings) => {
    e.preventDefault();
    settings.changeShowComp(!settings.showComp);
    displayComplete();
  }
  
  const displayComplete = () => {
    if(context.showComp === false) {
      setMovingList(list);
    } else {
      setMovingList(movingList.filter(item => !item.complete));
    }
    
  }

  const handleSort = (e, settings) => {
    e.preventDefault();
    settings.changeSort(e.target.value);
    sortList();
  }

  const sortList = () => {
   const sortType = context.sort;
   let sortedList = movingList.sort((a, b) => {
      if(a[sortType] > b[sortType]) {
        return 1;
      } else if(a[sortType] < b[sortType]) {
        return -1;
      } else
      return 0;
    });
    setMovingList(sortedList);
  }

  const handleAmount = (e, settings) => {
    e.preventDefault();
    settings.changeCardAmount(e.target.value)

    pagination();
  }

  const switchPage = (e) => {
    if(e.target.innerText === 'Previous') {
      if(page > 1) {
        setPage(page - 1);
      }
    } else {
      setPage(page + 1);
    }
  }

  const pagination = (list, settings) => {
    if(movingList.length) {
      let nextPage = [];
      let low = (context.cardAmount * (page - 1));
      let high = (context.cardAmount * page);
      for(let i = low ; i < high ; i++) {
        nextPage.push(movingList[i]);
      }
      setMovingList(nextPage);
    }
  }

  useEffect(() => {
    setMovingList(list);
  }, [movingList, list]);

  const handlePageSwitch = (e) => {
    console.log(e);
  }

let active = page;
let pageTabs = [];
for (let number = 1; number <= (list.length/context.cardAmount); number++) {
  pageTabs.push(
    <Pagination.Item key={number} value={pageTabs} onClick={(e) => handlePageSwitch(e)} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination size="sm" >{pageTabs}</Pagination>
  </div>
);


    return (
      <>
          <SettingsContext.Consumer>
          {settings => (
          <Card style={{ width: '60%', marginLeft: '30vw', marginTop: '36px' }} >
            <Card.Body>
              <div className="top-pref">
                <label>Display Completed: 
              <Button style={{ marginLeft: '8px' }} size="sm" onClick={((e) => handleShowComplete(e, settings))}>{settings.showComp.toString()}</Button>
                </label>
                <label style={{ marginLeft: '4px' }}>
                Sort By:
                </label>
                <select onChange={((e) => handleSort(e, settings))}>
                  <option value="difficulty">Sort By</option>
                  <option name="difficulty" value="difficulty">Difficulty</option>
                  <option name="assignee" value="assignee">Assignee</option>
                </select>
              </div>
                <label>Number of Items per Page
                  <input style={{ marginLeft: '8px', width: '5vw' }} onChange={(e) => handleAmount(e, settings)} type="number" name="cardAmount" min="1" max={list.length} required placeholder={settings.cardAmount} ></input>
                </label>
            </Card.Body>
          </Card>
          )}
        </SettingsContext.Consumer>
      <ListGroup style={{ width: '110%', marginLeft: '30vw', marginTop: '36px' }}>
        {list.map(item => (
          <Card key={item._id}  style={{ width: '24rem', marginBottom: '4px' }} >
            <Card.Body>
              <Card.Title style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid lightgrey', height: '2.5vh' }}>
                <span className={item.complete === true ? "complete progress-pill" : "pending progress-pill"} onClick={() => handleComplete(item._id)}>{item.complete === true ? "Complete" : "Pending"}</span>
                <span className="assigned-person">{item.assignee}</span>
                <button className="delete-button" size="sm" onClick={() => handleDelete(item._id)}>
                  X
                </button>
              </Card.Title>
              <Card.Text style={{ fontSize: '0.75rem', height: '4vh' }}>
                {item.text}
              </Card.Text>
              <Card.Text style={{ float: 'left', fontSize: '0.65rem' }}>Due: {item.due}</Card.Text>
              <Card.Text style={{ float: 'right', fontSize: '0.65rem' }}>Difficulty: {item.difficulty}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        <div className="page-bar">
          <Button size="sm" onClick={switchPage}>Previous</Button>
          <div className="pg-number">
            {page}
          </div>
          <Button size="sm" onClick={switchPage}>Next</Button> 
        </div>
      </ListGroup>
        {paginationBasic}
      </>
    );

}

export default TodoList;