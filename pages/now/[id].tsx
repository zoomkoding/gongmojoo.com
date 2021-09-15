import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { 공모주 } from "@/types";
import classNames from "classnames";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import classes from "./LiveDetail.module.scss";

export interface ILiveDetailPageProps {
  stock?: 공모주;
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getCurrentTime(x: string) {
  return new Date(x).toLocaleTimeString("kr", {
    month: "narrow",
    day: "2-digit",
  });
}

const LiveDetail: NextPage<ILiveDetailPageProps> = ({ stock }) => {
  if (!stock) {
    return (
      <DefaultPageLayout>
        <div className={classes.notFound}>
          해당 페이지가
          <br /> 존재하지 않습니다.
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <Head>
        <title>{stock.종목이름} 증권사별 실시간 청약 경쟁률 - 따상</title>
        <meta
          property="description"
          content={`따상 - ${stock.종목이름}의 증권사별 실시간 청약 경쟁률과 1주를 비례 배정 받기 위해 필요한 증거금을 알려드립니다.`}
        />
        <meta
          property="og:title"
          content={`${stock.종목이름} 증권사별 실시간 청약 경쟁률 - 따상`}
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content={`따상 - ${stock.종목이름}의 증권사별 실시간 청약 경쟁률과 1주를 비례 배정 받기 위해 필요한 증거금을 알려드립니다.`}
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.liveDetailPage}>
        <div className={classes.pageContent}>
          <div className={classes.pageName}>
            공모주 실시간 경쟁률
            {/* <QuestionCircle /> */}
          </div>

          <div className={classes.section}>
            <div className={classes.sectionContent}>
              <div className={classes.sectionHeader}>종목 정보</div>
              <div className={classes.stockName}>{stock.종목이름}</div>
              <div className={classes.stockDescription}>{stock.업종}</div>
              <div className={classes.stockDetails}>
                <div className={classes.stockInfoItem}>
                  <div className={classes.stockInfoLabel}>확정공모가</div>
                  <div className={classes.stockInfoValue}>
                    {stock.확정공모가}원
                  </div>
                </div>
                <div className={classes.stockInfoItem}>
                  <div className={classes.stockInfoLabel}>기관경쟁률</div>
                  <div className={classes.stockInfoValue}>
                    {stock.기관경쟁률}:1
                  </div>
                </div>
                <div className={classes.stockInfoItem}>
                  <div className={classes.stockInfoLabel}>의무보유확약</div>
                  <div className={classes.stockInfoValue}>
                    {stock.총의무보유확약비율}%
                  </div>
                </div>
              </div>
              {/* <div className={classes.moreInfoButton}>
                <div className={classes.button}>
                  더보기 <ChevronRight />
                </div>
              </div> */}
            </div>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              실시간 경쟁률
              <div className={classes.lastUpdatedTime}>
                {getCurrentTime(stock.주간사경쟁률[0].updatedAt)} 기준
              </div>
            </div>

            <div className={classes.securityInfoItems}>
              <div
                className={classNames([
                  classes.securityInfoItem,
                  classes.tableHeader,
                ])}
              >
                <div className={classes.securityName}>증권사</div>
                <div className={classes.rate}>비례경쟁률</div>
                <div className={classes.rate}>1주당 필요증거금</div>
              </div>
              {stock.주간사경쟁률.map((item) => (
                <div className={classes.securityInfoItem} key={item.증권사이름}>
                  <div className={classes.securityName}>{item.증권사이름}</div>
                  <div className={classes.rate}>{item.비례경쟁률}:1</div>
                  <div className={classes.rate}>
                    {numberWithCommas(stock.확정공모가 * 0.5 * item.비례경쟁률)}
                    원
                  </div>
                  {/* <div className={classes.rate}>{item.총청약건수}</div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<ILiveDetailPageProps> =
  async (context) => {
    if (!context.params?.id) {
      return { props: {} };
    }
    const res = await fetch(
      `http://localhost:3000/api/stock/${context.params.id}`
    );
    if (res.status >= 400) return { props: {} };
    const stock: 공모주 = await res.json();

    return {
      props: { stock },
    };
  };

export default LiveDetail;
