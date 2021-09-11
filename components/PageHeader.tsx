import classes from "./PageHeader.module.scss";

function PageHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.headerContent}>
        <div className={classes.logo}>따상</div>
        <div className={classes.menus}>
          <div className={classes.menu}>
            <a>공모주란</a>
          </div>
          <div className={classes.menu}>
            <a>진행중인 공모주</a>
          </div>
          <div className={classes.menu}>
            <a>공모주 캘린더</a>
          </div>
          <div className={classes.menu}>
            <a>계좌 개설 정보</a>
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
