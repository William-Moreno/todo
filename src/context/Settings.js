import React, { useState, useEffect } from 'react';

// create the context from react
export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  // define the values that any child component can read.
  let [sort, setSort] = useState('difficulty');
  let [cardAmount, setCardAmount] = useState(4);
  let [showComp, setShowComp] = useState(false);

  const state = {
    sort,
    cardAmount,
    showComp,
    changeSort: setSort,
    changeCardAmount: setCardAmount,
    changeShowComp: setShowComp,
  }


  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;