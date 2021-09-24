import StockListSection from "@/components/StockListSection";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { IStock } from "@@/types";
import type { GetStaticProps, NextPage } from "next";
import classes from "./index.module.scss";

export interface IHomePageProps {
  stocks: {
    finished: IStock[];
    inProgress: IStock[];
    upcoming: IStock[];
  };
}

const Home: NextPage<IHomePageProps> = ({ stocks }) => {
  return (
    <DefaultPageLayout>
      <h1 className={classes.introduction}>
        <div>공모주 청약 준비,</div>
        <div className={classes.secondLine}>
          <p className={classes.ddasang}>따상</p>
          <p>에서 쉽고 간편하게!</p>
        </div>
      </h1>
      <StockListSection
        stocks={stocks.inProgress}
        title="현재 진행중인 공모주"
        subtitle="현재 청약을 신청할 수 있는 공모주 리스트입니다."
      />
      <StockListSection
        stocks={stocks.upcoming}
        title="청약 예정인 공모주"
        subtitle="곧 청약이 진행될 공모주 리스트입니다."
      />
      <StockListSection
        stocks={stocks.finished}
        title="상장된 공모주"
        subtitle="이미 상장된 공모주 리스트입니다."
      />
    </DefaultPageLayout>
  );
};

// This gets called on every request
export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  const res = await fetch(`${process.env.API_URL}/gongmo/home`);
  if (res.status >= 400) return { notFound: true };
  const props: IHomePageProps = await res.json();
  return { props };
};

export default Home;
