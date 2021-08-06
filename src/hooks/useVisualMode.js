import { useState } from "react";

const useVisualMode = function(initialMode, replace) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode]);
  
  const transition = function(nextMode, replace) {
    // console.log("REPLACE: ", replace)

    if (replace === true) {
      let prev = history;
      // console.log(" B4 PREV", prev)
      prev[prev.length - 1] = nextMode
      // console.log(" AFT PREV", prev)
      setHistory(prev)
      setMode(prev => prev = nextMode)
    } else {
      setHistory((prev) => [...prev, nextMode])
      setMode(prev => prev = nextMode)
    }
    // console.log("HISTORY", history)
  }

  const back = function() {

    if (history.length > 1) {
      let prev = history;
      // console.log("PREV.POP,", prev.slice(0, -1))
      prev = prev.slice(0, -1)
      // console.log("PREV,", prev)
      setHistory(prev)
      setMode(prev2 => prev2 = prev[prev.length - 1])
    }

  }

  return {mode, transition, back }

}

export default useVisualMode;