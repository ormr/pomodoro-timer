import React, { useState, useEffect } from 'react';
import './timer.css';

import { Control } from '../control';

const Timer = () => {

  const initialState = {
    isReset: false,
    isSession: true,
    isBreak: false,
    isPaused: true,
    initialSession: 1000 * 60 * 25,
    initialBreak: 1000 * 60 * 5,
    sessionTime: 1000 * 60 * 25,
    breakTime: 1000 * 60 * 5
  }

  const [timer, setTimer] = useState(initialState);

    useEffect(() => {
      let interval = null;

      if (timer.isPaused) return;

      if (timer.isSession) {
        if (timer.sessionTime > 0) {
          interval = setInterval(() => {
            setTimer({ ...timer, sessionTime: timer.sessionTime - 1000 });
          }, 1000);
        } else {
          setTimer({
            ...timer,
            isSession: false,
            isBreak: true,
            sessionTime: timer.initialSession,
            breakTime: timer.breakTime - 1000
          });
        }
      } else if (timer.isBreak) {
        if (timer.breakTime > 0) {
          interval = setInterval(() => {
            setTimer({ ...timer, breakTime: timer.breakTime - 1000 });
          }, 1000);
        } else {
          setTimer({
            ...timer,
            breakTime: timer.timeBreak,
            sessionTime: timer.initialSession - 1000,
            isSession: true,
            isBreak: false
          });
        }
      }

    return () => clearInterval(interval);
  }, [timer, timer.isPaused]);

  const formateDate = (time) => {
    const isSixty = (time) => time === 3600000 ? '60' : Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); 
    const digitFormat = (n) => {
      return ('0' + n).slice(-2);
    }
    const minutes = digitFormat(isSixty(time));
    const seconds = digitFormat(Math.floor((time % (1000 * 60)) / 1000));

    return `${minutes}:${seconds}`;
  }

  const setControlLength = (value, timerValue) => {
    if (timerValue === 'breakTime') {
      setTimer({ ...timer, breakTime: value, initialBreak: value });
    } else {
      setTimer({ ...timer, sessionTime: value, initialSession: value });
    }
  }

  return (
    <div className="timer">
      <Control
        name="break"
        paused={timer.isPaused}
        isReset={timer.isReset}
        value={timer.initialBreak / (1000 * 60)}
        onChangeLength={(value) => setControlLength(value, 'breakTime')}
      />
      <Control
        name="session"
        paused={timer.isPaused}
        isReset={timer.isReset}
        value={timer.initialSession / (1000 * 60)}
        onChangeLength={(value) => setControlLength(value, 'sessionTime')}
      />
      <div className="timer-wrapper">
        <div id="timer-label">{timer.isSession ? 'Session' : 'Break'}</div>
        <div id="time-left">{formateDate(timer.isSession ? timer.sessionTime : timer.breakTime)}</div>
      </div>
      <div className="timer-control">
        <button
          id="start_stop"
          onClick={() => setTimer(prevValue => ({ ...prevValue, isPaused: !prevValue.isPaused }))}>
          Start/Stop
        </button>
        <button
          id="reset"
          onClick={() => setTimer(initialState)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export {
  Timer
};