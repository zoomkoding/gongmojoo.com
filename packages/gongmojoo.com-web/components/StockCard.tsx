import { IStock } from "@/../types";
import { getDateDiff, getLocalDate } from "@/utils";
import { isNumber } from "lodash";
import Link from "next/link";
import React, { useMemo } from "react";
import classes from "./StockCard.module.scss";

export interface IStockCardProps {
  stock: IStock;
  to?: "live" | "details";
}

// - 주식명
// - 주간사
// - 공모가
// - 공모기간 D day
// - 태그(+ 당일계좌개설후청약가능 여부)

function StockCard({ stock, to = "details" }: IStockCardProps) {
  const dateDiff = useMemo(
    () => getDateDiff(new Date(), stock.공모청약시작일),
    [stock.공모청약시작일]
  );

  const dDayStatus = useMemo(() => {
    if (!dateDiff || dateDiff === 0 || dateDiff === 1) return "오늘";
    return `D${dateDiff > 0 ? "+" : ""}${dateDiff}`;
  }, [dateDiff]);

  const date = useMemo(() => {
    if (dDayStatus === "진행중") {
      return `~${getLocalDate(stock.공모청약종료일, "simple")}`;
    }
    return getLocalDate(stock.공모청약시작일, "simple");
  }, [dDayStatus, stock]);

  return (
    <Link href={`/${to}/${stock.id}`} passHref>
      <div className={classes.stockCard}>
        <div className={classes.info}>
          <div className={classes.name}>{stock.이름}</div>
          <div className={classes.securities}>{stock.주간사.join(", ")}</div>
          {isNumber(stock.기관경쟁률) && isNumber(stock.총의무보유확약비율) && (
            <div className={classes.details}>
              기관경쟁률 {stock.기관경쟁률.toFixed(0)}:1 의무보유비율{" "}
              {stock.총의무보유확약비율}%
            </div>
          )}
        </div>
        <div className={classes.date}>
          <div className={classes.dateDiff}>{dDayStatus}</div>
          <div className={classes.startingDate}>{date}</div>
        </div>
      </div>
    </Link>
  );
}
export default StockCard;
