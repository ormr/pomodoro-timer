import React, { useState, useEffect, Fragment } from 'react';
import './clock.css';

const Clock = ({ time, timeBreak }) => {

  const [length, setLength] = useState({
    isLength: true,
    isBreak: false,
    isPaused: true,
    sessionTime: time,
    breakTime: timeBreak
  });

  useEffect(() => {
    let interval = null;

    if (length.isPaused) {
      if (length.sessionTime !== time) {
        setLength({...length, sessionTime: time});
      } else if (length.breakTime !== timeBreak) {
        setLength({...length, breakTime: timeBreak});
      } else {
        return;
      }
    }

    if (length.isLength) {
      if (length.sessionTime > 0) {
        interval = setInterval(() => {
          setLength({ ...length, sessionTime: length.sessionTime - 1000 });
        }, 1000);
      } else {
        setLength({
          ...length,
          sessionTime: 1000 * 60 * time,
          isLength: false,
          isBreak: true,
          breakTime: length.breakTime - 1000
        });
      }
    } else if (length.isBreak) {
      if (length.breakTime > 0) {
        interval = setInterval(() => {
          setLength({ ...length, breakTime: length.breakTime - 1000 });
        }, 1000);
      } else {
        setLength({
          ...length,
          breakTime: 1000 * 60 * timeBreak,
          isLength: true,
          isBreak: false
        });
      }
    }
    return () => clearInterval(interval);
  }, [length, length.isPaused, time, timeBreak]);

  const formateDate = (time) => {
    const isSixty = (time) => time === 3600000 ? '60' : Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); 
    const digitFormat = (n) => {
      return ('0' + n).slice(-2);
    }
    console.log(time)
    const minutes = digitFormat(isSixty(time));
    const seconds = digitFormat(Math.floor((time % (1000 * 60)) / 1000));

    return `${minutes}:${seconds}`;
  }

  return (
    <Fragment>
      <div className="timer-wrapper">
        <div id="timer-label">Session</div>
        <div id="time-left">{formateDate(length.isLength ? length.sessionTime : length.breakTime)}</div>
      </div>
      <div className="timer-control">
        <button
          id="start_stop"
          onClick={() => setLength(prevValue => ({ ...prevValue, isPaused: !prevValue.isPaused }))}>
          Start/Stop
        </button>
        <button id="reset">Reset</button>
      </div>
    </Fragment>
  );
};

export {
  Clock
};