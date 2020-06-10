import React, { useState, useEffect } from 'react';
import './control.css';

const Control = ({name, value, onChangeLength}) => {

  const [length, setLength] = useState(value);

  const nameToUpperCase = (name) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  };

  const changeLength = (value) => {
    return (value > 0 && value < 60) ? setLength(value) : length;
  };

  useEffect(() => {
    onChangeLength(length);
  }, [length]);

  return (
    <div className="length-control">
      <div id={`${name}-label`}>
        {nameToUpperCase(name)} length
      </div>
      <div className="length-control--settings">
        <button id={name + '-increment'} onClick={() => changeLength(length + 1)}>↑</button>
        <div id={name + '-length'}>{length}</div>
        <button id={name + '-decrement'} onClick={() => changeLength(length - 1)}>↓</button>
      </div>
    </div>
  );
}

export {
  Control
};