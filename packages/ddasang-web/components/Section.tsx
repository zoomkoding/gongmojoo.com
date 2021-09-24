import React, { ReactNode } from "react";
import classes from "./Section.module.scss";

export interface ISectionProps {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children?: ReactNode;
}

function Section({ title, subtitle, children }: ISectionProps) {
  return (
    <div className={classes.section}>
      {title && <div className={classes.title}>{title}</div>}
      {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
      <div className={classes.content}>{children}</div>
    </div>
  );
}
export default Section;
