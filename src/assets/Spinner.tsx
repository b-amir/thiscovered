import * as React from "react";
const Spinner = (): JSX.Element => (
  <svg
    style={{
      marginRight: "8px",
      // spin the element
      animation: "spin 1s linear infinite",
      // keyframes
      "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" }
      }
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="18px"
    height="18px"
    fill="none"
    viewBox="0 0 24 24">
    <path
      fill="var(--text-color)"
      d="M12 21a9 9 0 1 1 6.18-15.55.75.75 0 0 1 0 1.06.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 1 1 1.5 0 9 9 0 0 1-9 9Z"
    />
  </svg>
);
export default Spinner;
