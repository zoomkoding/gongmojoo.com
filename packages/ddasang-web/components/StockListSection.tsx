import { IStock } from "@/../types";
import React from "react";
import Section, { ISectionProps } from "./Section";
import StockCard from "./StockCard";
import classes from "./StockListSection.module.scss";

export interface IStockListSectionProps extends ISectionProps {
  stocks: IStock[];
  to?: "details" | "live";
}

function StockListSection({
  stocks,
  to,
  ...sectionProps
}: IStockListSectionProps) {
  if (!stocks || stocks.length === 0) return null;
  return (
    <Section {...sectionProps}>
      <div className={classes.stockCards}>
        {stocks.map((stock) => (
          <StockCard key={stock.id} stock={stock} to={to} />
        ))}
      </div>
    </Section>
  );
}
export default StockListSection;
