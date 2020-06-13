import React, { useState } from 'react';
import './timer.css';

import { Control } from '../control';
import { Clock } from '../clock';

const Timer = () => {

  const [timer, setTimer] = useState({
    session: 25,
    break: 5
  });

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
      <Clock time={timer.session} timeBreak={timer.break} />
    </div>
  );
}

export {
  Timer
};