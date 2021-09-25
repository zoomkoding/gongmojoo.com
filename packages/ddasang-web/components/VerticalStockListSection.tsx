import { IStock } from "@/../types";
import { get상승률 } from "@/utils";
import React from "react";
import SectionHeader from "./SectionHeader";
import classes from "./VerticalStockListSection.module.scss";

export interface IVerticalStockListSectionProps {
  stocks: IStock[];
}

function VerticalStockListSection({ stocks }: IVerticalStockListSectionProps) {
  return (
    <div className={classes.section}>
      <SectionHeader
        title="최근 상장한 공모주"
        subtitle="상장한 종목들의 공모가 대비 상장일 종가입니다."
        selfIndent
      />
      <div className={classes.content}>
        {stocks.map((stock) => (
          <div className={classes.stockCard} key={stock.id}>
            <div className={classes.name}>{stock.이름}</div>
            <div
              className={classes.rate}
              style={{ color: get상승률(stock).color }}
            >
              {get상승률(stock).value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default VerticalStockListSection;
