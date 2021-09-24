import { IStock, IStockSecurity } from "@/../types";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getMoneyNeededForOne(stock: IStock, security: IStockSecurity) {
  if (!stock.확정공모가) return 0;
  const 공모가기준증거금 = stock.확정공모가 * stock.증거금비율 * 0.01;
  return numberWithCommas(공모가기준증거금 * security.비례경쟁률);
}

export function getLocalDate(x?: string) {
  if (!x) return;
  return new Date(x).toLocaleDateString("kr", {
    month: "narrow",
    day: "2-digit",
  });
}
