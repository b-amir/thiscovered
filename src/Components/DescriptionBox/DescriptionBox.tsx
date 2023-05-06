/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";

interface IProps {
  title?: string;
  children: React.ReactNode;
  isSpecial?: boolean;
}
export function DescriptionBox({
  title,
  children,
  isSpecial
}: IProps): JSX.Element {
  return (
    <div
      className={`grid-tab-description ${
        isSpecial && "description-title special-type"
      }`}>
      <h3 className="description-title">{title}</h3>
      {children}
    </div>
  );
}
