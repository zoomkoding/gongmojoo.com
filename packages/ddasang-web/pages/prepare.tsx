import { ISecurity, IStock } from "@/../types";
import HrefButton from "@/components/HrefButton";
import Section from "@/components/Section";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import classNames from "classnames";
import { cloneDeep, flatten, uniq } from "lodash";
import { GetServerSideProps, NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./prepare.module.scss";

export interface IPreparePageProps {
  stocks: IStock[];
  securities: ISecurity[];
}

const Prepare: NextPage<IPreparePageProps> = ({ stocks, securities }) => {
  const [selectedStocks, setSelectedStocks] = useState<IStock[]>([]);
  const [selectedSecurities, setSelectedSecurities] = useState<ISecurity[]>([]);
  const securitiesFromSelectedStocks = useMemo(
    () => uniq(flatten(selectedStocks.map(({ 주간사 }) => 주간사))),
    [selectedStocks]
  );

  const onStockChipClick = useCallback(
    (stock: IStock) => () => {
      setSelectedStocks((oldStocks) => {
        const newStocks = cloneDeep(oldStocks);
        const index = newStocks.findIndex(({ 이름 }) => 이름 === stock.이름);
        if (index === -1) {
          return [...newStocks, stock];
        } else {
          newStocks.splice(index, 1);
          return newStocks;
        }
      });
    },
    []
  );

  const onSecurityChipClick = useCallback(
    (securityName: string) => () => {
      setSelectedSecurities((oldSecurities) => {
        const security = securities.find(({ 이름 }) => 이름 === securityName);
        if (!security) return oldSecurities;

        const newSecurities = cloneDeep(oldSecurities);
        const index = newSecurities.findIndex(
          ({ 이름 }) => 이름 === security.이름
        );
        if (index === -1) {
          return [...newSecurities, security];
        } else {
          newSecurities.splice(index, 1);
          return newSecurities;
        }
      });
    },
    [securities]
  );

  useEffect(() => {
    setSelectedSecurities((oldSecurities) =>
      oldSecurities.filter((security) =>
        securitiesFromSelectedStocks.includes(security.이름)
      )
    );
  }, [securitiesFromSelectedStocks]);

  return (
    <DefaultPageLayout>
      <h1 className={classes.introduction}>
        <div>다가오는 공모주에</div>
        <div className={classes.secondLine}>
          <p>필요한 계좌를 알려드립니다!</p>
        </div>
      </h1>

      <Section
        title={"관심 공모주 선택"}
        subtitle={"청약을 진행하고 싶은 공모주를 선택하세요!"}
      >
        <div className={classes.stockChips}>
          {stocks.map((stock) => (
            <div
              key={stock.id}
              className={classNames({
                [classes.stockChip]: true,
                [classes.selected]: selectedStocks
                  .map(({ 이름 }) => 이름)
                  .includes(stock.이름),
              })}
              onClick={onStockChipClick(stock)}
            >
              {stock.이름}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="보유 중인 증권 계좌 선택"
        subtitle="아래는 선택하신 공모주를 주간하는 증권사 목록입니다. 가지고 계신 증권 계좌를 선택하세요!"
      >
        <div className={classes.stockChips}>
          {securitiesFromSelectedStocks.map((securityName) => (
            <div
              key={securityName}
              className={classNames({
                [classes.securityChip]: true,
                [classes.selected]: selectedSecurities
                  .map(({ 이름 }) => 이름)
                  .includes(securityName),
              })}
              onClick={onSecurityChipClick(securityName)}
            >
              {securityName}
            </div>
          ))}
        </div>
      </Section>
      <div className={classes.submitButton}>
        <HrefButton href="/" buttonText="계좌 준비 순서 보기" />
      </div>
    </DefaultPageLayout>
  );
};

export default Prepare;

export const getServerSideProps: GetServerSideProps<IPreparePageProps> =
  async () => {
    const res = await fetch(`${process.env.API_URL}/gongmo/prepare`);
    if (res.status >= 400) return { notFound: true };
    const props: IPreparePageProps = await res.json();
    return { props };
  };
