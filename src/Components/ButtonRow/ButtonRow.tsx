import React from "react";

interface IProps {
  rightButton: React.ReactNode;
  middleButton?: React.ReactNode;
  leftButton?: React.ReactNode;
}

export function ButtonRow({
  leftButton,
  middleButton,
  rightButton
}: IProps): JSX.Element {
  return (
    <div className="grid-button-row">
      <div className="grid-button-left">{leftButton}</div>
      <div className="grid-button-middle">{middleButton}</div>
      <div className="grid-button-right">{rightButton}</div>
    </div>
  );
}
