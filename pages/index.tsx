import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import type { NextPage } from "next";
import classes from "./index.module.scss";

const Home: NextPage = () => {
  return (
    <DefaultPageLayout>
      <div className={classes.homePage}>
        <h1 className={classes.introduction}>
          <div>공모주의 모든 것</div>
          <div className={classes.secondLine}>
            <p>따상에서 </p>
            <p className={classes.space}>&nbsp;</p>
            <p>쉽고 간편하게</p>
          </div>
        </h1>
        <p className={classes.promotion}>10월 중 서비스 예정!</p>
      </div>
    </DefaultPageLayout>
  );
};

export default Home;
