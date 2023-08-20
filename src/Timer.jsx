import React, { useState, useEffect } from "react";
import bell from "./assets/bell.mp3";

const sound = new Audio(bell);

let start = Date.now();
let pauseTime = Date.now();

function Timer({ timerLength = 1500 }) {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);

  const onResetClick = () => {
    resetTimer();
    pauseTime = Date.now()
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
  }

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        if (pauseTime > 0) {
          start = start + (Date.now() - pauseTime); 
          pauseTime = 0
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
    sound.play();
    setTimeout(() => {
      sound.play();
    }, 1000);
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
