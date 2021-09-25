import React, { ReactNode } from "react";
import classes from "./SectionHeader.module.scss";

export interface ISectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
}

function SectionHeader({ title, subtitle }: ISectionHeaderProps) {
  return (
    <div className={classes.sectionHeader}>
      <div className={classes.title}>{title}</div>
      {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
    </div>
  );
}
export default SectionHeader;
