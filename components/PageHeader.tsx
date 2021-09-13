import classNames from "classnames";
import { Bars, Multiply } from "framework7-icons-plus/react";
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
          <div className={classes.logo}>
            <p className={classes.icon}>🤑</p> 따상
          </div>
        </Link>

        <div
          className={classes.showMenuButton}
          onClick={() => setIsMenuOpened((value) => !value)}
        >
          {isMenuOpened ? <Multiply /> : <Bars />}
        </div>

        <div className={classes.menus}>
          <div className={classes.menu}>
            <Link href="/about" passHref>
              <a>공모주 따상이란</a>
            </Link>
          </div>
          <div className={classes.menu}>
            <Link href="/live" passHref>
              <a>진행중인 공모주</a>
            </Link>
          </div>
          <div className={classes.menu}>
            <Link href="/live" passHref>
              <a>공모주 캘린더</a>
            </Link>
          </div>
          <div className={classes.menu}>
            <Link href="/strategy" passHref>
              <a>계좌 개설 정보</a>
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
