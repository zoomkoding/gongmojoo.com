import classNames from "classnames";
import React, { ReactNode } from "react";
import classes from "./SectionHeader.module.scss";

export interface ISectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  selfIndent?: boolean;
}

function SectionHeader({ title, subtitle, selfIndent }: ISectionHeaderProps) {
  return (
    <div
      className={classNames({
        [classes.sectionHeader]: true,
        [classes.selfIndent]: selfIndent,
      })}
    >
      <div className={classes.title}>{title}</div>
      {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
    </div>
  );
}
export default SectionHeader;
