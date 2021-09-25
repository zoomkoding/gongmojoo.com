import Divider from "@/components/Divider";
import HrefButton from "@/components/HrefButton";
import Section from "@/components/Section";
import StockListSection from "@/components/StockListSection";
import VerticalStockListSection from "@/components/VerticalStockListSection";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { IStock } from "@@/types";
import type { GetStaticProps, NextPage } from "next";
import React from "react";
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
        <div>요즘 핫한 공모주 청약,</div>
        <div className={classes.secondLine}>
          <p>
            <strong className={classes.ddasang}>따상</strong>에서 준비하자!
          </p>
        </div>
      </h1>

      <VerticalStockListSection stocks={stocks.finished} />
      <Divider />
      <StockListSection
        stocks={stocks.inProgress}
        title="현재 진행중인 공모주"
        subtitle="현재 청약을 신청할 수 있는 공모주 리스트입니다."
      />
      <Section
        title="공모주린이를 위한 필승 전략"
        subtitle="다가오는 공모주에 필요한 증권계좌를 잘 만들 수 있도록!"
      >
        <HrefButton href="/" buttonText="다가오는 공모주 준비하러 가기" />
      </Section>
      <Divider />
      <Divider hide={stocks.inProgress.length === 0} />
      <StockListSection
        stocks={stocks.upcoming}
        title="청약 예정인 공모주"
        subtitle="곧 청약이 진행될 공모주 리스트입니다."
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
