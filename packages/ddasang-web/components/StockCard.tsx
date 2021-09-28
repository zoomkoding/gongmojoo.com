import { IStock } from "@/../types";
import { getDateDiff, getLocalDate } from "@/utils";
import React, { useMemo } from "react";
import classes from "./StockCard.module.scss";

export interface IStockCardProps {
  stock: IStock;
}

// - 주식명
// - 주간사
// - 공모가
// - 공모기간 D day
// - 태그(+ 당일계좌개설후청약가능 여부)

function StockCard({ stock }: IStockCardProps) {
  const dateDiff = useMemo(
    () => getDateDiff(stock.공모청약시작일, new Date()),
    [stock.공모청약시작일]
  );
  return (
    <div className={classes.stockCard}>
      <div className={classes.info}>
        <div className={classes.name}>{stock.이름}</div>
        <div className={classes.securities}>{stock.주간사.join(", ")}</div>
        {stock.기관경쟁률 && stock.총의무보유확약비율 && (
          <div className={classes.details}>
            기관경쟁률 {stock.기관경쟁률.toFixed(0)}:1 의무보유비율{" "}
            {stock.총의무보유확약비율}%
          </div>
        )}
      </div>
      {dateDiff && dateDiff > 0 ? (
        <div className={classes.date}>
          <div className={classes.dateDiff}>{`D-${dateDiff}`}</div>
          <div className={classes.startingDate}>
            {getLocalDate(stock.공모청약시작일, "simple")}
          </div>
        </div>
      ) : (
        <div className={classes.date}>
          <div className={classes.dateDiff}>진행중</div>
          <div className={classes.startingDate}>
            {`~${getLocalDate(stock.공모청약종료일, "simple")}`}
          </div>
        </div>
      )}
    </div>
  );
}
export default StockCard;
