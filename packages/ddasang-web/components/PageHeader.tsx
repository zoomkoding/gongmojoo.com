import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./PageHeader.module.scss";

function PageHeader() {
  //🚀🔺🧨💸💥🤑
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  return (
    <header
      className={classNames({
        [classes.header]: true,
        [classes.showMenus]: isMenuOpened,
      })}
    >
      <div className={classes.headerContent}>
        <Link href="/" passHref>
          <div className={classes.logo}>공모주닷컴</div>
        </Link>

        <div
          className={classes.showMenuButton}
          onClick={() => setIsMenuOpened((value) => !value)}
        >
          <i className="framework7-icons">
            {isMenuOpened ? "multiply" : "bars"}
          </i>
        </div>

        <div className={classes.menus}>
          {/* <div className={classes.menu}>
            <Link href="/about" passHref>
              <a>공모주 청약이란</a>
            </Link>
          </div> */}
          <div className={classes.menu}>
            <Link href="/list" passHref>
              <a>공모주 전체 보기</a>
            </Link>
          </div>
          {/* <div className={classes.menu}>
            <Link href="/live" passHref>
              <a>공모주 캘린더</a>
            </Link>
          </div> */}
          <div className={classes.menu}>
            <Link href="/prepare" passHref>
              <a>계좌 준비하기</a>
            </Link>
          </div>
          <div className={classes.menu}>
            <a>피드백 남기기</a>
          </div>
        </div>
      </div>
    </header>
  );
}
export default PageHeader;
