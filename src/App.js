import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    let intervalId;

    if (time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      setTimerId(intervalId);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(intervalId);
  }, [time]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = parseInt(event.target.value);

      if (isNaN(inputValue) || inputValue <= 0) {
        setTime(0);
      } else {
        setTime(Math.floor(inputValue));
      }

      event.target.value = "";
    }
  };

  const handleReset = () => {
    clearInterval(timerId);
    setTimerId(null);
    setTime(0);
  };

  return (
    <div className="container">
      <input type="text" id="timeCount" onKeyDown={handleKeyDown} />
      <div id="current-time" className={time === 0 ? "expired" : ""}>
        {time}
      </div>
      {time === 0 && timerId !== null && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}

export default App;