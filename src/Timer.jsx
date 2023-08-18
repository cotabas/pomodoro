import React, { useState, useEffect } from "react";
import bell from "./assets/bell.mp3";

const sound = new Audio(bell);

let start = Date.now();

function Timer({ timerLength = 1500 }) {
  const [time, setTime] = useState(Date.now());
  const [paused, setPaused] = useState(true);

  const onResetClick = () => {
    resetTimer();
  }

  const onPauseClick = () => {
    setPaused(!paused);
  }

  const resetTimer = () => {
    setPaused(true);
    start = Date.now();
    setTime(Date.now() - start);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (paused) {
        start = start + 500; 
// need to find a better way to do this..
      } else {
      setTime(Date.now() - start)
      }
    }, 500);

    return function cleanup() {
      clearInterval(timer);
    }
  });

  let count = timerLength - Math.floor(time / 1000)

  if (count == 0) {
    setPaused(true);
    sound.play();
  }

  return (
    <div className="card">
      <h1>{Math.floor(count / 60)}:{count % 60 < 10 ? "0" + count % 60 : count % 60}</h1>
      <button onClick={onPauseClick}>pause/start</button>
      <button onClick={onResetClick}>reset</button>
    </div>
  );
}


export default Timer
