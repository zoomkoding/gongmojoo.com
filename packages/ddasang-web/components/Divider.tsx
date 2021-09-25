import React from "react";
import classes from "./Divider.module.scss";

export interface IDividerProps {
  hide?: boolean;
}

function Divider({ hide }: IDividerProps) {
  return hide ? null : (
    <div className={classes.dividerContainer}>
      <div className={classes.divider} />
    </div>
  );
}
export default Divider;
