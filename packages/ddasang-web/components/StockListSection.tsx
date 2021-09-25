import { IStock } from "@/../types";
import React from "react";
import Section, { ISectionProps } from "./Section";
import StockCard from "./StockCard";
import classes from "./StockListSection.module.scss";

export interface IStockListSectionProps extends ISectionProps {
  stocks: IStock[];
}

function StockListSection({ stocks, ...sectionProps }: IStockListSectionProps) {
  if (!stocks || stocks.length === 0) return null;
  return (
    <Section {...sectionProps}>
      <div className={classes.stockCards}>
        {stocks.map((stock) => (
          <StockCard stock={stock} key={stock.id} />
        ))}
      </div>
    </Section>
  );
}
export default StockListSection;
