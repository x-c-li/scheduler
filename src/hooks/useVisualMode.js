import { useState } from "react";

const useVisualMode = function(initialMode, replace) {
  const [history, setHistory] = useState([initialMode]);
  
  const transition = function(nextMode, replace) {
    
    setHistory((prev) => {

      if (replace) {
        prev.pop();
      };

      return [...prev, nextMode]

    });

  };

  const back = function() {
    if (history.length < 2) {
      return;
    };

    setHistory(prev => {
      return prev.slice(0, prev.length - 1);
    });

  };

  const mode = history[history.length - 1];
  return {mode, transition, back };

}

export default useVisualMode;