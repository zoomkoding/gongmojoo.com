import classNames from "classnames";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import classes from "./PageHeader.module.scss";

function PageHeader() {
  //🚀🔺🧨💸💥🤑
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const toggleMenuModal = useCallback(() => {
    setMenuIsOpened((value) => !value);
  }, []);

  return (
    <header
      className={classNames({
        [classes.header]: true,
        [classes.showMenus]: menuIsOpened,
      })}
    >
      <div className={classes.headerContent}>
        <Link href="/" passHref>
          <div className={classes.logo}>공모주닷컴</div>
        </Link>

        <div className={classes.showMenuButton} onClick={toggleMenuModal}>
          <i className="framework7-icons">
            {menuIsOpened ? "multiply" : "bars"}
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
              공모주 전체 보기
            </Link>
          </div>
          {/* <div className={classes.menu}>
            <Link href="/live" passHref>
              <a>공모주 캘린더</a>
            </Link>
          </div> */}
          <div className={classes.menu}>
            <Link href="/prepare" passHref>
              계좌 준비하기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default PageHeader;
