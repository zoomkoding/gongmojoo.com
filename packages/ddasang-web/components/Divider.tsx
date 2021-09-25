import React from "react";
import classes from "./Divider.module.scss";

export interface IDividerProps {
  hide?: boolean;
}

function Divider({ hide }: IDividerProps) {
  return hide ? null : <div className={classes.divider} />;
}
export default Divider;
