import React, { useState, useEffect } from 'react';
import './timer.css';

import { Control } from '../control';

const Timer = () => {

  const [timer, setTimer] = useState({
    session: 25,
    break: 5
  });

  const countDown = (value) => {
    const countDownDate = new Date().getTime() + (1000 * 60 * value);
    const timeNow = new Date().getTime();

    const distance = countDownDate - timeNow;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const digitFormat = (n) => (n < 10 ? '0' : '') + n;

    return `${digitFormat(minutes)}:${digitFormat(seconds)}`;
  }

  return (
    <div className="timer">
      <Control
        name="break"
        value={5}
        onChangeLength={(value) => setTimer({ ...timer, break: value })}
      />
      <Control
        name="session"
        value={25}
        onChangeLength={(value) => setTimer({ ...timer, session: value })}
      />
      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">Session</div>
          <div id="time-left">{countDown(timer.session)}</div>
        </div>
        <div className="timer-control">
        <button id="start-stop">Start/Stop</button>
        <button id="reset">Reset</button>
        </div>
      </div>
    </div>
  );
}

export {
  Timer
};