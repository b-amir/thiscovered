import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

export function PageTitle({ title, subtitle }: IProps): JSX.Element {
  return (
    <div className="grid-tab-info">
      <div className="grid-tab-title">{title}</div>
      <div className="grid-tab-subtitle">{subtitle}</div>
    </div>
  );
}
