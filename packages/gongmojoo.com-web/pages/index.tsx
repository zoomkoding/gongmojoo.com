import Divider from "@/components/Divider";
import HrefButton from "@/components/HrefButton";
import Section from "@/components/Section";
import StockListSection from "@/components/StockListSection";
import VerticalStockListSection from "@/components/VerticalStockListSection";
import VerticalYouTubeListSection from "@/components/VerticalYoutubeListSection";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { getDateDiff } from "@/utils";
import { IStock } from "@@/types";
import type { GetServerSideProps, NextPage } from "next";
import React, { useMemo } from "react";
import classes from "./index.module.scss";

export interface IHomePageProps {
  stocks: {
    finished: IStock[];
    inProgress: IStock[];
    upcoming: IStock[];
  };
}

const Home: NextPage<IHomePageProps> = ({ stocks }) => {
  const tomorrowStock = useMemo(
    () =>
      stocks.upcoming.filter(
        (stock) => getDateDiff(stock.공모청약시작일, new Date()) === 1
      ),
    [stocks.upcoming]
  );

  return (
    <DefaultPageLayout>
      <h1 className={classes.introduction}>
        <div>요즘 핫한 공모주 청약 🔥</div>
        <div>
          <strong className={classes.siteName}>공모주닷컴</strong>에서
          준비하세요!
        </div>
      </h1>
      <VerticalYouTubeListSection
        videos={[
          {
            id: 1,
            videoId: "Mky-BFQQtnM",
          },
        ]}
      />
      <StockListSection
        stocks={stocks.inProgress}
        to="live"
        title="😎 청약 진행중인 공모주"
        subtitle="실시간 경쟁률을 알려드립니다!"
      />
      <Divider hide={stocks.inProgress.length === 0} />
      <StockListSection
        stocks={stocks.upcoming.filter(
          (stock) => getDateDiff(stock.공모청약시작일, new Date()) === 1
        )}
        title="🚀 내일 청약 시작!"
        subtitle="원하는 종목에 필요한 계좌가 없으다면 지금 개설하세요!"
      />
      <Divider hide={tomorrowStock.length === 0} />
      <VerticalStockListSection stocks={stocks.finished} />
      <Divider />
      <Section
        title="🤔 계좌는 잘 준비하셨나요?"
        subtitle="다가오는 공모주에 필요한 증권 계좌를 잘 준비할 수 있도록!"
      >
        <div className={classes.prepareButton}>
          <HrefButton
            href="/prepare"
            buttonText="다가오는 공모주 준비하러 가기"
          />
        </div>
      </Section>
      <Divider />
      <StockListSection
        stocks={stocks.upcoming.filter((stock) => stock)}
        title="🧞‍♂️ 청약 예정인 공모주"
        subtitle="곧 청약이 진행되니 잊지 말고 계좌를 만들어두세요!"
      />
    </DefaultPageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<IHomePageProps> =
  async () => {
    const res = await fetch(`${process.env.API_URL}/gongmo/home`);
    if (res.status >= 400) return { notFound: true };
    const props: IHomePageProps = await res.json();
    return { props };
  };

export default Home;
