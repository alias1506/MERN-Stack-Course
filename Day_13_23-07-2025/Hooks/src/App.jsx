import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [watch, setWatch] = useState(0);
  const [message, setMessage] = useState("");

  const timerRef = useRef(null); // For Timer
  const stopwatchRef = useRef(null); // For Stopwatch

  const increment = () => {
    setValue((prev) => {
      if (prev >= 15) {
        setMessage("Maximum value is 15.");
        return 15;
      }
      setMessage("");
      return prev + 1;
    });
  };

  const decrement = () => {
    setValue((prev) => {
      if (prev <= -15) {
        setMessage("Minimum value is -15.");
        return -15;
      }
      setMessage("");
      return prev - 1;
    });
  };

  const reset = () => {
    setValue(0);
    setMessage("");
  };

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    setCount(0);
    stopTimer();
  };

  const startStopwatch = () => {
    if (stopwatchRef.current) return;
    stopwatchRef.current = setInterval(() => {
      setWatch((prev) => prev + 1);
    }, 100);
  };

  const stopStopwatch = () => {
    clearInterval(stopwatchRef.current);
    stopwatchRef.current = null;
  };

  const resetStopwatch = () => {
    setWatch(0);
    stopStopwatch();
  };

  const formatWatchTime = () => {
    const totalSeconds = Math.floor(watch / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = watch % 10;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${tenths}`;
  };

  useEffect(() => {
    return () => {
      stopTimer();
      stopStopwatch();
    };
  }, []);

  return (
    <div className="app-container">
      <h1>
        Value: <span className="value">{value}</span>
      </h1>
      <div className="button-container">
        <button className="btn btn-primary" onClick={decrement}>
          Decrement
        </button>
        <button className="btn btn-primary" onClick={increment}>
          Increment
        </button>
        <button className="btn btn-primary" onClick={reset}>
          Reset
        </button>
      </div>
      <div id="message">
        <p className="message">{message}</p>
      </div>

      <div className="timer">
        <h1>Timer</h1>
        <div className="count-container">
          <p className="count">{count}</p>
        </div>
        <div className="button-container">
          <button className="btn btn-primary" onClick={startTimer}>
            Start
          </button>
          <button className="btn btn-primary" onClick={stopTimer}>
            Stop
          </button>
          <button className="btn btn-primary" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>

      <div className="stopwatch-top">
        <h1>Stopwatch</h1>
        <div className="stopwatch-container">
          <p className="stopwatch">{formatWatchTime()}</p>
        </div>
        <div className="button-container">
          <button className="btn btn-primary" onClick={startStopwatch}>
            Start
          </button>
          <button className="btn btn-primary" onClick={stopStopwatch}>
            Stop
          </button>
          <button className="btn btn-primary" onClick={resetStopwatch}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
