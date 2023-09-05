import React, { useState, useEffect } from "react";
import bell from "./assets/bell.mp3";

const sound = new Audio(bell);

let start = Date.now();
let pauseTime = Date.now();
let timerLength = 1500;

function Timer() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);

  const onLengthClick = (timerTime) => {
    timerLength = timerTime;
    setPaused(false);
    setTimeout(() => {
      resetTimer();
      pauseTime = Date.now()
    }, 600);
    // waiting unpaused so that the component rerenders the timer display after changing the timerLength
  }

  const onPauseClick = () => {
    setPaused(!paused);
    if (!paused) {
      pauseTime = Date.now()
    }
  }

  const resetTimer = () => {
    setPaused(true);
    start = Date.now();
    setTime(Date.now() - start);
    //wait.. setTime(0) would be the same thing..
  }

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        if (pauseTime > 0) {
          start = start + (Date.now() - pauseTime); 
          pauseTime = 0;
        }
        setTime(Date.now() - start)
      }, 500);

      return function cleanup() {
        clearInterval(timer);
      }
    }
  });

  let count = timerLength - Math.floor(time / 1000)

  if (count == 0) {
    setPaused(true);
    setTime(0);
    pauseTime = Date.now()
    sound.play();
  }

  return (
    <div className="card">
      <h1>{Math.floor(count / 60)}:{count % 60 < 10 ? "0" + count % 60 : count % 60}</h1>
      <button onClick={onPauseClick}>pause/start</button>
      <button onClick={() => onLengthClick(1500)}>work</button>
      <button onClick={() => onLengthClick(240)}>short break</button>
      <button onClick={() => onLengthClick(900)}>long break</button>
    </div>
  );
}


export default Timer
