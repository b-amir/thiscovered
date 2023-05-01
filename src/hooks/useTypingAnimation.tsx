import { useState, useEffect } from "react";

const useTypingAnimation = (
  text: string | JSX.Element,
  speed: number,
  delay = 0
) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    let currentIndex = 0;

    const updateText = () => {
      setDisplayText(text.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > text.length) {
        clearInterval(timerId);
      }
    };

    timerId = setTimeout(() => {
      setInterval(updateText, speed);
    }, delay);

    return () => {
      clearInterval(timerId);
    };
  }, [text, speed, delay]);

  return displayText;
};

export default useTypingAnimation;
