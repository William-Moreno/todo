import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../context/Settings.js';

function Preferences({ list }) {

  let [page, setPage] = useState(1);
  let [movingList, setMovingList] = useState(list);

  let context = useContext(SettingsContext);

  const handleComplete = (e, settings) => {
    e.preventDefault();
    settings.changeShowComp(!settings.showComp);
    displayComplete();
  }

  const handleSort = (e, settings) => {
    e.preventDefault();
    settings.changeSort(e.target.value);
    sortList();
  }

  const handleAmount = (e, settings) => {
    e.preventDefault();
    settings.changeCardAmount(e.target.cardAmount.value);
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

  const displayComplete = () => {
    if(!context.showComp) {
      setMovingList(list);
    } else {
      setMovingList(movingList.filter(item => !item.complete));
    }
    
  }

  const sortList = () => {
   const sortType = context.sort;
   let sortedList = movingList.sort((a, b) => {
      if(a[context.sort] > b[context.sort]) {
        return 1;
      } else if(a[context.sort] < b[context.sort]) {
        return -1;
      } else
      return 0;
    });
    setMovingList(sortedList);
  }

  const pagination = (list, settings) => {
    if(movingList[0]) {
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
  }, [list]);


  return (
    <div>
      <SettingsContext.Consumer>
          {settings => (
            <div>
              <button onClick={((e) => handleComplete(e, settings))}>Display Completed: {settings.completed}</button>
                <form onSubmit={((e) => handleAmount(e, settings))}>
                  <input type="number" name="cardAmount" required placeholder={settings.cardAmount} ></input>
                  <button type="submit">Items on Page</button>
                </form>
                <select onChange={((e) => handleSort(e, settings))}>
                  <option value="difficulty">Sort By</option>
                  <option name="difficulty" value="difficulty">Difficulty</option>
                  <option name="assignee" value="assignee">Assignee</option>
                </select>
                <button onClick={switchPage}>Previous</button>
                <button onClick={switchPage}>Next</button>
            </div>
          )}
        </SettingsContext.Consumer>
    </div>
  )

}

export default Preferences;