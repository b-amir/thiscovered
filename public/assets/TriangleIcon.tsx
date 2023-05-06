import * as React from "react";
import { type SVGProps } from "react";
const TriangleIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    className="triangle-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="22px"
    height="22px"
    viewBox="0 0 24 24"
    fill="var(--text-color-2)"
    {...props}>
    <path d="M11.646 15.146 5.854 9.354a.5.5 0 0 1 .353-.854h11.586a.5.5 0 0 1 .353.854l-5.793 5.792a.5.5 0 0 1-.707 0z" />
  </svg>
);
export default TriangleIcon;
