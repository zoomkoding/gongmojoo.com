import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { getLocalTime, getMoneyNeededForOne } from "@/utils";
import { IStock, IStockSecurity } from "@@/types";
import classNames from "classnames";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import classes from "./Details.module.scss";

export interface IDetailPageProps {
  stock: IStock;
  stockSecurities: IStockSecurity[];
}

const Detail: NextPage<IDetailPageProps> = ({ stock, stockSecurities }) => {
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
      title={`${stock.이름} 증권사별 실시간 청약 경쟁률 - 따상`}
      description={`${stock.이름}의 증권사별 실시간 청약 경쟁률과 1주를 배정 받기 위해 필요한 증거금을 알려드립니다.`}
    >
      <div className={classes.liveDetailPage}>
        <div className={classes.pageContent}>
          <div className={classes.pageName}>공모주 실시간 경쟁률</div>
          <div className={classes.section}>
            <div className={classes.sectionContent}>
              <div className={classes.sectionHeader}>종목 정보</div>
              <div className={classes.stockName}>{stock.이름}</div>
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
            </div>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              실시간 경쟁률
              <div className={classes.lastUpdatedTime}>
                {getLocalTime(stockSecurities[0].updatedAt)} 기준
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
                <div className={classes.rate}>1주당필요증거금</div>
              </div>
              {stockSecurities.map((security) => (
                <div className={classes.securityInfoItem} key={security.id}>
                  <div className={classes.securityName}>
                    {security.증권사이름}
                  </div>
                  <div className={classes.rate}>{security.비례경쟁률}:1</div>
                  <div className={classes.rate}>
                    {getMoneyNeededForOne(stock, security)}원
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

export default Detail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.API_URL}/gongmo/stock`);
  const list: { id: number }[] = await res.json();
  const paths = list.map(({ id }) => ({
    params: { id: id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IDetailPageProps> = async (
  context
) => {
  if (!context.params?.id) return { notFound: true };
  const res = await fetch(
    `${process.env.API_URL}/gongmo/stock/${context.params.id}`
  );
  if (res.status >= 400) return { notFound: true };

  const props: IDetailPageProps = await res.json();
  if (!props.stock) return { notFound: true };

  return { props };
};
