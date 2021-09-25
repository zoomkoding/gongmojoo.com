import React, { ReactNode } from "react";
import classes from "./Section.module.scss";
import SectionHeader, { ISectionHeaderProps } from "./SectionHeader";

export interface ISectionProps extends ISectionHeaderProps {
  children?: ReactNode;
}

function Section({ children, ...sectionHeaderProps }: ISectionProps) {
  return (
    <div className={classes.section}>
      <SectionHeader {...sectionHeaderProps} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}
export default Section;
