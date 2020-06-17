import React, { useState, useEffect } from 'react';
import './control.css';

const Control = ({name, paused, isReset, value, onChangeLength}) => {
  const [length, setLength] = useState(value);

  const nameToUpperCase = (name) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  };

  const changeLength = (currentValue) => {
    if (isReset) {
      setLength(25)
    } else if (value > 0 && value <= 60 && paused) {
      setLength(currentValue)
    }
  };

  useEffect(() => {
    onChangeLength(length * 1000 * 60);
  }, [length]);

  return (
    <div className="length-control">
      <div id={`${name}-label`}>
        {nameToUpperCase(name)} length
      </div>
      <div className="length-control--settings">
        <button className="increment-button btn-level" id={name + '-increment'} onClick={() => changeLength(length + 1)}>
          <i className="fa fa-arrow-up"></i>
        </button>
        <div id={name + '-length'}>{isReset ? value : length}</div>
        <button className="decrement-button btn-level" id={name + '-decrement'} onClick={() => changeLength(length - 1)}>
          <i className="fa fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
}

export {
  Control
};