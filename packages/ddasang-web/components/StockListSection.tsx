import { IStock } from "@/../types";
import React from "react";
import Section, { ISectionProps } from "./Section";
import StockCard from "./StockCard";

export interface IStockListSectionProps extends ISectionProps {
  stocks: IStock[];
}

function StockListSection({ stocks, ...sectionProps }: IStockListSectionProps) {
  console.log(stocks);
  return (
    <Section {...sectionProps}>
      {stocks.map((stock) => (
        <StockCard stock={stock} key={stock.id} />
      ))}
    </Section>
  );
}
export default StockListSection;
