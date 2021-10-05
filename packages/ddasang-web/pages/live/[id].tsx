import Section from "@/components/Section";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import {
  getLocalDate,
  getLocalTime,
  getMoneyNeededForOne,
  getStockCurrentStatus,
} from "@/utils";
import { IStock, IStockSecurity } from "@@/types";
import classNames from "classnames";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import classes from "./LiveDetail.module.scss";

export interface ILiveDetailPageProps {
  stock: IStock;
  stockSecurities: IStockSecurity[];
}

const LiveDetail: NextPage<ILiveDetailPageProps> = ({
  stock,
  stockSecurities,
}) => {
  const status = getStockCurrentStatus(stock);

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
    <DefaultPageLayout
      title={`${stock.이름} 증권사별 실시간 청약 경쟁률 - 공모주닷컴`}
      description={`${stock.이름}의 증권사별 실시간 청약 경쟁률과 1주를 배정 받기 위해 필요한 증거금을 알려드립니다.`}
    >
      <div className={classes.liveDetailPage}>
        <div className={classes.pageContent}>
          <div className={classes.stockInfo}>
            <div
              className={classes.stockStatus}
              style={{ color: status.color }}
            >
              {status.value}
            </div>
            <div className={classes.stockName}>{stock.이름}</div>
            <div className={classes.stockSecurities}>
              {stock.주간사.join(", ")}
            </div>
          </div>
          <Section title="🧞‍♂️ 주요 공모 정보">
            <div className={classes.roundedContainer}>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>공모청약일</div>
                <div className={classes.stockInfoValue}>
                  {stock.공모청약시작일
                    ? `${getLocalDate(stock.공모청약시작일)} ~ ${getLocalDate(
                        stock.공모청약종료일
                      )}`
                    : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>확정공모가</div>
                <div className={classes.stockInfoValue}>
                  {stock.확정공모가 ? `${stock.확정공모가}원` : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>기관경쟁률</div>
                <div className={classes.stockInfoValue}>
                  {stock.기관경쟁률 ? `${stock.기관경쟁률}:1` : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>총의무보유확약</div>
                <div className={classes.stockInfoValue}>
                  {stock.총의무보유확약비율
                    ? `${stock.총의무보유확약비율}%`
                    : "미정"}
                </div>
              </div>
              <Link href={`/details/${stock.id}`} passHref>
                <div className={classes.moreInfoButton}>더보기</div>
              </Link>
            </div>
          </Section>

          <Section
            title={
              <div className={classes.sectionHeader}>
                🔥 실시간 경쟁률
                <div className={classes.lastUpdatedTime}>
                  {getLocalTime(stockSecurities[0].updatedAt)} 기준
                </div>
              </div>
            }
          >
            <div className={classes.roundedContainer}>
              {status.value !== "🎯 청약예정" ? (
                <>
                  <div
                    className={classNames([
                      classes.securityInfoItem,
                      classes.tableHeader,
                    ])}
                  >
                    <div className={classes.securityName}>증권사</div>
                    <div className={classes.rate}>비례경쟁률</div>
                    <div className={classes.rate}>1주당필요증거금</div>
                  </div>
                  {stockSecurities.map((security) => (
                    <div className={classes.securityInfoItem} key={security.id}>
                      <div className={classes.securityName}>
                        {security.증권사이름}
                      </div>
                      <div className={classes.rate}>
                        {security.일반경쟁률 && security.일반비례물량
                          ? `${security.일반경쟁률 * 2}:1`
                          : "-"}
                      </div>
                      <div className={classes.rate}>
                        {security.일반경쟁률 && security.일반비례물량
                          ? getMoneyNeededForOne(stock, security) + "원"
                          : "-"}
                      </div>
                      {/* <div className={classes.rate}>{item.총청약건수}</div> */}
                    </div>
                  ))}
                </>
              ) : (
                <div className={classes.notStarted}>
                  아직 청약이 시작되지 않은 공모주입니다.😭
                </div>
              )}
            </div>
          </Section>
        </div>
      </div>
    </DefaultPageLayout>
  );
};

export default LiveDetail;

export const getServerSideProps: GetServerSideProps<ILiveDetailPageProps> =
  async (context) => {
    if (!context.params?.id) return { notFound: true };
    const res = await fetch(
      `${process.env.API_URL}/gongmo/stock/${context.params.id}`
    );
    if (res.status >= 400) return { notFound: true };

    const props: ILiveDetailPageProps = await res.json();
    if (!props.stock) return { notFound: true };

    return { props };
  };
