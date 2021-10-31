import { IStock } from "@/../types";
import StockListSection from "@/components/StockListSection";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import classes from "./index.module.scss";

export interface IListPageProps {
  stocks: IStock[];
}

const List: NextPage<IListPageProps> = ({ stocks }) => {
  return (
    <DefaultPageLayout title="공모주일정 - 공모주닷컴">
      <h1 className={classes.introduction}>
        <div>🔥 요즘 핫한 공모주 청약,</div>
        <div>
          <strong className={classes.siteName}>공모주닷컴</strong>에서
          준비하세요!
        </div>
      </h1>

      <StockListSection
        title="모든 공모주 리스트"
        subtitle="D-day는 청약 시작일 기준입니다."
        stocks={stocks}
      />
    </DefaultPageLayout>
  );
};

export default List;

export const getServerSideProps: GetServerSideProps<IListPageProps> =
  async () => {
    const res = await fetch(`${process.env.API_URL}/gongmo/stock`);
    if (res.status >= 400) return { notFound: true };
    const stocks: IStock[] = await res.json();
    return { props: { stocks } };
  };
