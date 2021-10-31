import Link from "next/link";
import React from "react";
import classes from "./HrefButton.module.scss";

export interface IButtonProps {
  buttonText: string;
  href: string;
}

function HrefButton({ href, buttonText }: IButtonProps) {
  return (
    <Link href={href} passHref>
      <div className={classes.button}>{buttonText}</div>
    </Link>
  );
}
export default HrefButton;
