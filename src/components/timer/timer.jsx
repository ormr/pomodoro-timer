import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = () => {

  const initialState = {
    isSession: true,
    isBreak: false,
    isPaused: true,
    initialSession: 25,
    initialBreak: 5,
    count: 25 * 60 * 1000
  }

  const soundStop = () => {
    const sound = document.querySelector('#beep');
    sound.pause();
    sound.currentTime = 0;
  }

  const [timer, setTimer] = useState(initialState);

  useEffect(() => {
    let interval = null;

    const soundStart = () => {
      const sound = document.querySelector('#beep');
      sound.currentTime = 0;
      sound.play();
    }

    if (timer.isPaused) return;

    if (timer.isSession) {
      if (timer.count > 0) {
        interval = setInterval(() => {
          setTimer({ ...timer, count: timer.count - 1000 });
        }, 1000);
      } else {
        setTimer({
          ...timer,
          isSession: false,
          isBreak: true,
          count: timer.initialBreak * 60 * 1000
        });
        soundStart();
      }
    } else if (timer.isBreak) {
      if (timer.count > 0) {
        interval = setInterval(() => {
          setTimer({ ...timer, count: timer.count - 1000 });
        }, 1000);
      } else {
        setTimer({
          ...timer,
          isSession: true,
          isBreak: false,
          count: timer.initialSession * 60 * 1000
        });
        soundStart();
      }
    }

    return () => clearInterval(interval);
  }, [timer]);

  const formateDate = (time) => {
    const isSixty = (time) => time === 3600000 ? '60' : Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const digitFormat = (n) => {
      return ('0' + n).slice(-2);
    }
    const minutes = digitFormat(isSixty(time));
    const seconds = digitFormat(Math.floor((time % (1000 * 60)) / 1000));

    return `${minutes}:${seconds}`;
  }

  const changeLength = (lengthName, operator) => {
    if (lengthName === 'break' && operator === '+' && timer.initialBreak < 60) {
      if (timer.isBreak) {
        return setTimer({ ...timer, initialBreak: timer.initialBreak + 1, count: timer.count + 60000 });
      }
      return setTimer({ ...timer, initialBreak: timer.initialBreak + 1 });
    }
    if (lengthName === 'break' && operator === '-' && timer.initialBreak > 1) {
      if (timer.isBreak) {
        return setTimer({ ...timer, initialBreak: timer.initialBreak - 1, count: timer.count - 60000 });
      }
      setTimer({ ...timer, initialBreak: timer.initialBreak - 1 });
    }
    if (lengthName === 'session' && operator === '+' && timer.initialSession < 60) {
      if (timer.isSession) {
        return setTimer({ ...timer, initialSession: timer.initialSession + 1, count: timer.count + 60000 });
      }
      return setTimer({ ...timer, initialSession: timer.initialSession + 1 });
    }
    if (lengthName === 'session' && operator === '-' && timer.initialSession > 1) {
      if (timer.isSession) {
        return setTimer({ ...timer, initialSession: timer.initialSession - 1, count: timer.count - 60000 });
      }
      return setTimer({ ...timer, initialSession: timer.initialSession - 1 });
    }
  }

  return (
    <div className="timer">
      <div className="length-control">
        <div id="break-label">
          Break length
        </div>
        <div className="length-control--settings">
          <button className="increment-button btn-level" id="break-increment" onClick={() => changeLength('break', '+')}>
            <i className="fa fa-arrow-up"></i>
          </button>
          <div id="break-length">{timer.initialBreak}</div>
          <button className="decrement-button btn-level" id="break-decrement" onClick={() => changeLength('break', '-')}>
            <i className="fa fa-arrow-down"></i>
          </button>
        </div>
      </div>
      <div className="length-control">
        <div id="session-label">
          Session length
        </div>
        <div className="length-control--settings">
          <button className="increment-button btn-level" id="session-increment" onClick={() => changeLength('session', '+')}>
            <i className="fa fa-arrow-up"></i>
          </button>
          <div id="session-length">{timer.initialSession}</div>
          <button className="decrement-button btn-level" id="session-decrement" onClick={() => changeLength('session', '-')}>
            <i className="fa fa-arrow-down"></i>
          </button>
        </div>
      </div>
      <div className="timer-wrapper">
        <div id="timer-label">{timer.isSession ? 'Session' : 'Break'}</div>
        <div id="time-left">{formateDate(timer.count)}</div>
      </div>
      <div className="timer-control">
        <button
          className="btn-level"
          id="start_stop"
          onClick={() => setTimer(prevValue => ({ ...prevValue, isPaused: !prevValue.isPaused }))}>
          <i class="fa fa-play"></i>
          <i class="fa fa-pause"></i>
        </button>
        <button
          className="btn-level"
          id="reset"
          onClick={() => {
            soundStop();
            setTimer(initialState)
          }}>
          <i class="fa fa-refresh"></i>
        </button>
      </div>
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export {
  Timer
};