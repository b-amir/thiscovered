/* eslint-disable prefer-const */
import { useState, useEffect } from "react";

const useTypingAnimation = (
  text: string | JSX.Element,
  speed: number,
  delay = 0
): any => {
  const [animatedSubtitle, setDisplayText] = useState("");

  useEffect(() => {
    // type: timeout
    let timerId: NodeJS.Timeout;
    let currentIndex = 0;

    const updateText = (): any => {
      setDisplayText(text.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > text.toString.length) {
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

  return animatedSubtitle;
};

export default useTypingAnimation;
